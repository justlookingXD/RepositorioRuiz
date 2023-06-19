<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GenreController;

Route::middleware('guest')->get('/user', 'UserController@getUser');
Route::get('/track/{idTrack}', 'TrackController@show');
Route::middleware('guest')->post('/login', 'AuthController@login');
Route::middleware('guest')->post('/register', 'AuthController@register');
Route::get('/getGenres', 'GenreController@all');
Route::middleware('auth:sanctum')->post('/logout', 'AuthController@login');
Route::middleware('auth:sanctum')->post('/saveTrack', 'TrackController@store');
Route::middleware('auth:sanctum')->post('/deleteTrack', 'TrackController@store');
Route::middleware('auth:sanctum')->post('/updateTrack', 'TrackController@store');
Route::middleware('auth:sanctum')->post('/allTracksUser', 'TrackController@getUserTracks');
Route::middleware('auth:sanctum')->get('/userauth','UserController@getUser');


Route::get('/aboutme', function () {
    $file = public_path('Manuel Ruiz Lorente Curriculum.pdf');
    $headers = [
        'Content-Type' => 'application/pdf',
    ];

    return response()->download($file, 'Manuel Ruiz Lorente Curriculum.pdf', $headers);
});



