<?php

namespace App\Http\Controllers;

use App\Http\Resources\PropertyResource;
use App\Http\Resources\UserResource;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
    public function users(Request $request): JsonResponse
    {
        return response()->json(
            UserResource::collection(User::all()),
            Response::HTTP_OK
        );
    }

    public function properties(Request $request): JsonResponse
    {
        return response()->json(
            PropertyResource::collection(Property::all()),
            Response::HTTP_OK
        );
    }

    public function destroy_user(int $id): JsonResponse
    {
        $user = User::find($id);

        if ($user) {
            $user->delete();
        }

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function destroy_property(int $id): JsonResponse
    {
        $property = Property::find($id);

        if ($property) {
            $property->delete();
        }

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
