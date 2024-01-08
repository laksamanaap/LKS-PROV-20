<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    // Get All User
    public function getAllUsers()
    {        
        $allUser = $this->user->get();
        return response()->json(['data' => $allUser],200);
    }

    // Get Specific User
    public function getSpecificUser($id)
    {
        $user = $this->user::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found!']);
        }

        return response()->json($user,200);
    }

    // Update User
    public function updateUser(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'username' => 'required|string'
        ]);

        if ($validator->fails()) {
            \Log::error($validator->errors());
            return response()->json($validator->errors());
        }

        $user = $this->user::find($id);

        if (!$user) {
            return response()->json(['message' => 'No user found!']);
        }

        $user->update([
            'username' => $request->input('username')
        ]);

         return response()->json([
            'message' => 'success update user!',
            'data' => $user
        ], 200);

    }

    // Delete user
    public function deleteUser(Request $request, $id) 
    {
        $user = $this->user::destroy($id);

        return response()->json([
            'message' => 'success delete user!'
        ]);
    }

}
