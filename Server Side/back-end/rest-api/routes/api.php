<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PlayerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// User Management

// Auth
Route::post('users/auth', [AuthController::class, 'loginUsers'])->name('loginUsers');
Route::post('users', [AuthController::class, 'registerUsers'])->name('registerUsers');

// User Management

Route::get('users', [UserController::class, 'getAllUsers'])->name('getAllUsers');
Route::get('users/{id}', [UserController::class, 'getSpecificUser'])->name('getSpecificUser');
Route::put('users/{id}', [UserController::class, 'updateUser'])->name('updateUser');
Route::delete('users/{id}', [UserController::class, 'deleteUser'])->name('deleteUser');

// Player Management

Route::post('player', [PlayerController::class, 'storePlayer'])->name('storePlayer');
Route::get('player', [PlayerController::class, 'getAllPlayers'])->name('getAllPlayers');
Route::get('player/{id}', [PlayerController::class, 'getSpecificPlayer'])->name('getSpecificPlayer');
Route::put('player/{id}', [PlayerController::class, 'updatePlayer'])->name('updatePlayer');
Route::delete('player/{id}', [PlayerController::class, 'deletePlayer'])->name('deletePlayer');
