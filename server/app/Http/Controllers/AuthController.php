<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /*
        {
            "token": '8|gwZ8tQCfAoRDmLrEgBP4LoW82B2LsFiE5PThDEZV3ad198ad'
        } 
    */
    public function sign_in(Request $request): JsonResponse
    {
        $user = User::where('email', $request->email)->firstOrFail();

        if (!Hash::check($request->password, $user->password))
            return response()->json([
                'message' => 'Invalid credentials.'
            ], Response::HTTP_BAD_REQUEST);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
        ], Response::HTTP_OK);
    }

    /*
        {
            "user": { "email": "test@gmail.com", ... },
            "token": '8|gwZ8tQCfAoRDmLrEgBP4LoW82B2LsFiE5PThDEZV3ad198ad'
        }
    */
    public function sign_up(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string|min:5|confirmed',
            'phone_number' => ['required', 'string'],
            'location' => 'nullable|string',
        ]);

        if ($validator->fails())
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);

        $data = $validator->validated();

        $user = User::create([
            'email' => $data['email'],
            'username' => $data['username'],
            'password' => bcrypt($data['password']),
            'phone_number' => $data['phone_number'],
            'location' => $data['location'] ?? null,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
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
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'phone_number' => 'required|string',
            'password' => 'required|string|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], Response::HTTP_BAD_REQUEST);
        }

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
