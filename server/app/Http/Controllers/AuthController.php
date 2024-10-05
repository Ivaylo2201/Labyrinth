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
    public function sign_in(Request $request): JsonResponse
    {
        $user = User::where('username', $request->username)->firstOrFail();

        if (!Hash::check($request->password, $user->password)) 
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
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string|min:5',
            'phone_number' => 'required|nullable|string',
            'location' => 'nullable|string',
        ]);

        if ($validator->fails())
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);       

        $data = $validator->validated();

        $user = User::create([
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
            'username' => 'required|string|exists:users,username',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], Response::HTTP_BAD_REQUEST);
        }

        $data = $validator->validated();

        $user = User::where('username', $data['username'])->first();
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
