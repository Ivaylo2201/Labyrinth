<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// public routes
Route::prefix('/properties')->group(function () {
    Route::get('/search', [PropertyController::class, 'search']);
    Route::get('/{id}', [PropertyController::class, 'show']);
    Route::get('/', [PropertyController::class, 'index']);
});

Route::prefix('/auth')->group(function () {
    Route::post('/signin', [AuthController::class, 'sign_in']);
    Route::post('/signup', [AuthController::class, 'sign_up']);
    Route::patch('/reset', [AuthController::class, 'reset']);
});

// private routes
Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/auth/signout', [AuthController::class, 'sign_out']);
    Route::prefix('/properties')->group(function () {
        Route::delete('/{id}', [PropertyController::class, 'destroy']);
        Route::patch('/{id}', [PropertyController::class, 'update']);
        Route::post('/', [PropertyController::class, 'store']);
    });
    Route::prefix('/profile')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::delete('/delete', [UserController::class, 'destroy']);
    });
});

// admin routes
Route::middleware([AdminMiddleware::class])->group(function () {
    Route::prefix('/admin')->group(function () {
        Route::prefix('/users')->group(function () {
            Route::get('/', [AdminController::class, 'users']);
            Route::delete('/{id}', [AdminController::class, 'destroy_user']);
        });
        Route::prefix('/properties')->group(function () {
            Route::get('/', [AdminController::class, 'properties']);
            Route::delete('/{id}', [AdminController::class, 'destroy_property']);
        });
    });
});
