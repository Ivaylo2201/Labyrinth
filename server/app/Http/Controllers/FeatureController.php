<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class FeatureController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            FeatureResource::collection(Feature::all()),
            Response::HTTP_OK
        );
    }
}
