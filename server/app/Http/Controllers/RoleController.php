<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class RoleController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            RoleResource::collection(Role::whereNot('name', 'admin')->get()),
            Response::HTTP_OK
        );
    }
}
