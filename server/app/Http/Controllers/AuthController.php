<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function sign_in(Request $request): JsonResponse
    {
        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials.'
            ], Response::HTTP_BAD_REQUEST);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
        ], Response::HTTP_OK);
    }

    public function sign_up(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string|min:5',
            'phone_number' => 'nullable|string',
            'location' => 'nullable|string',
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'password' => bcrypt($validated['password']),
            'phone_number' => $validated['phone_number'] ?? null,
            'location' => $validated['location'] ?? null,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], Response::HTTP_CREATED);
    }

    public function sign_out(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
