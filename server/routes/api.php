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
Route::prefix('/properties')->group(function () {
    Route::get('/{id}', [PropertyController::class, 'show']);
    Route::get('/search', [PropertyController::class, 'search']);
    Route::get('/', [PropertyController::class, 'index']);
});

Route::prefix('/auth')->group(function () {
    Route::post('/signup', [UserController::class, 'store']);
    Route::get('/signin', [AuthController::class, 'signin']);
});

// protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('/properties')->group(function () {
        Route::post('/', [PropertyController::class, 'store']);
        Route::delete('/{id}', [PropertyController::class, 'destroy']);
        Route::put('/{id}', [PropertyController::class, 'update']);
    });
});
