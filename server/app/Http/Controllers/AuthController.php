<?php

namespace App\Http\Controllers;

use App\Helpers\ValidationHelper;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use App\Rules\AuthControllerRules;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function sign_in(Request $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password))
            return response()->json([
                'message' => 'Invalid credentials.'
            ], Response::HTTP_BAD_REQUEST);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
        ], Response::HTTP_OK);
    }

    public function sign_up(Request $request): JsonResponse
    {
        $validator = Validator::make(
            $request->all(), 
            AuthControllerRules::sign_up(),
            [
                'role_id.required' => 'The role field is required.'
            ]
        );

        if ($validator->fails())
            return ValidationHelper::invalidate($validator);

        $data = $validator->validated();

        $user = User::create([
            'email' => $data['email'],
            'username' => $data['username'],
            'password' => bcrypt($data['password']),
            'phone_number' => $data['phone_number'],
            'location' => $data['location'] ?? 'Unknown',
            'role_id' => $data['role_id']
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ], Response::HTTP_CREATED);
    }

    public function sign_out(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function reset(Request $request): JsonResponse
    {
        $validator = Validator::make(
            $request->all(), 
            AuthControllerRules::reset()
        );

        if ($validator->fails())
            return ValidationHelper::invalidate($validator);

        $data = $validator->validated();

        $user = User::where('email', $data['email'])
            ->where('phone_number', $data['phone_number'])
            ->first();

        if (!$user)
            return response()->json([
                'message' => 'Incorrect phone number.'
            ], Response::HTTP_BAD_REQUEST);

        $password = $data['password'];

        if (Hash::check($password, $user->password)) {
            return response()->json([
                'message' => 'New password must differ from the old password.',
            ], Response::HTTP_BAD_REQUEST);
        }

        $user->password = bcrypt($password);
        $user->save();

        return response()->json([
            'message' => 'Password successfully changed.',
        ], Response::HTTP_OK);
    }
}
