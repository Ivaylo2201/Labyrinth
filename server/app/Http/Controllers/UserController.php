<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
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

    public function destroy(Request $request): JsonResponse
    {
        $request->user()->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
