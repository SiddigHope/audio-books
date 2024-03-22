<?php

use App\Http\Controllers\Api\V1\{
    AudioController,
    BooksController,
    GradeController,
    KeywordController,
    LanguageController
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('v1/grades', [GradeController::class, 'index']);
Route::get('v1/books', [BooksController::class, 'index']);
Route::get('v1/keywords', [KeywordController::class, 'index']);
Route::get('v1/language', [LanguageController::class, 'index']);
Route::post('v1/audio_save', [AudioController::class, 'store']);
Route::post('v1/audio_get', [AudioController::class, 'index']);
