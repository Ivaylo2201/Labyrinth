<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// public routes
Route::get('/properties/search', [PropertyController::class, 'search']);
Route::get('/properties', [PropertyController::class, 'index']);
Route::post('/signup', [UserController::class, 'store']);
Route::get('/signin', [AuthController::class, 'signin']);


// protected routes
Route::middleware('auth:sanctum')->group(function() {
    Route::post('/properties', [PropertyController::class, 'store']);
});
 