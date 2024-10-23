<?php

namespace App\Http\Controllers;

use App\Http\Resources\PropertyShortResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(
            new UserResource($request->user()),
            Response::HTTP_OK
        );
    }

    public function users(Request $request): JsonResponse
    {
        return response()->json(
            UserResource::collection(User::all()),
            Response::HTTP_OK
        );
    }

    public function properties(Request $request): JsonResponse
    {
        $properties = $request->user()->properties;

        if ($properties->isEmpty()) {
            return response()->json(['message' => 'No properties found.'], Response::HTTP_NO_CONTENT);
        }

        return response()->json(
            PropertyShortResource::collection($properties),
            Response::HTTP_OK
        );
    }

    public function destroy(Request $request): JsonResponse
    {
        $request->user()->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
