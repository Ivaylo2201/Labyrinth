<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use \Illuminate\Validation\Validator;

class ValidationHelper
{
    public static function invalidate(Validator $validator): JsonResponse
    {
        return response()->json([
            'message' => 'Validation failed.',
            'errors' => $validator->errors()
        ], Response::HTTP_BAD_REQUEST);
    }
}
