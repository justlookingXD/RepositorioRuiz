<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function all() {
        $genres = Genre::all();
        return response()->json($genres);
    }

    
}
