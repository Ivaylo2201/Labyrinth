<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(
            new UserResource($request->user()),
            Response::HTTP_OK
        );
    }

    public function reset(Request $request): JsonResponse
    {
        $user = $request->user();
        $password = $request['password'] ?? null;

        if (!$password)
            return response()->json([
                'message' => 'New password was not provided.',
            ], Response::HTTP_BAD_REQUEST);

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

    public function destroy(Request $request): JsonResponse
    {
        $request->user()->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
