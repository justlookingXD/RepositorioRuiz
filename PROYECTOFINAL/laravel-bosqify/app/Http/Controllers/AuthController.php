<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Models\User;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'The provided credentials are incorrect.',
            ], 422);
        }

        $credentials = $validator->validated();

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        }

        return response()->json([
            'error' => 'Invalid credentials.',
        ], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        Auth::logout();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }

    public function register(Request $request)
    {
        $imgPath = 'public\img\users';
        try {
            $validatedData = $request->validate([
                'email' => ['required', 'email', 'unique:users'],
                'password' => ['required'],
                'userName' => ['required'],
            ]);

            $user = User::create([
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'userName' => $validatedData['userName'],
            ]);

            if ($request->hasFile('userProfilePicture')) {
                $image = $request->file('userProfilePicture');
                $imageName = $user->id . '.' . $image->getClientOriginalExtension();
                $image->storeAs($imgPath, $imageName);
                $user->userProfilePicture = $imageName;
                $user->save();
            }

            Auth::login($user);

            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    
    
}
