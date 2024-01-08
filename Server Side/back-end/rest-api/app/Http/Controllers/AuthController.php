<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function me() 
    {
        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => 'User fetched successfully!',
            ],
            'data' => [
                'user' => auth()->user(),
            ],
        ]);
    }


    public function registerUsers(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([$validator->errors()], 422);
        }

        if ($this->user::where('username', $request->input('username'))->exists()) {
            return response()->json(['message' => 'Username has been used!'], 401);
        } else {

             $this->validate($request, [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = $this->user::create([
            'username' => $request->input('username'),
            'password' => bcrypt($request->input('password')),
        ]);

        $token = auth()->login($user);

        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => 'User created successfully!',
            ],
            'data' => [
                'user' => $user,
                'access_token' => [
                    'token' => $token,
                    'type' => 'Bearer',
                    'expires_in' => auth()->factory()->getTTL() * 60,   
                ],
            ],
        ]);

        }
       
    }

    public function loginUsers(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([$validator->errors()], 422);
        }

        $token = auth()->attempt([
            'username' => $request->input('username'),
            'password' => $request->input('password')
        ]);

        if ($token) {
            return response()->json([
                'meta' => [
                    'code' => 200,
                    'status' => 'success',
                    'message' => 'Quote fetched successfully.',
                ],
                'data' => [
                    'user' => auth()->user(),
                    'access_token' => [
                        'token' => $token,
                        'type' => 'Bearer',
                        'expires_in' => auth()->factory()->getTTL() * 60,
                    ],
                ],
            ]);
        } else {
            return response()->json(['error' => 'Try to check your username or password'],401);
        }

    }

    


}
