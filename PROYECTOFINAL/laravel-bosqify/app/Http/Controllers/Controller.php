<?php

namespace App\Http\Controllers;

//Problemas con CORS handleCors nativo de laravel (he usado la vieja confiable)
//header('Access-Control-Allow-Origin: http://localhost:3000');
//header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
//header('Access-Control-Allow-Headers: Content-Type, Authorization');

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
