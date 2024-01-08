<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlayerController extends Controller
{
      public function __construct(Player $player)
    {
        $this->player = $player;
    }

    // Store Player
   public function storePlayer(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'posisi' => 'required|string',
            'name' => 'required|string',
            'nomer_punggung' => 'required|string',
            'updated_by' => 'required|string',
            'created_by' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([$validator->errors()], 422);
        }

        $userID = $request->input('created_by');
        $userDB = User::find($userID);

        if (!$userDB) {
            return response()->json(['message' => 'User not found'], 404);
        } else {
            $player = new Player([
                'posisi' => $request->input('posisi'),
                'name' => $request->input('name'),
                'nomer_punggung' => $request->input('nomer_punggung'),
                'updated_by' => $request->input('updated_by'),
                'created_by' => $request->input('created_by'),
            ]);

            $userDB->players()->save($player);

            // Retrieve the player with the associated user
            $playerWithAuthor = Player::with('user')->find($player->id);

            return response()->json([
                'message' => 'Success create player!',
                'data' => $playerWithAuthor,
            ], 200);
        }

    }

    // Get All player
    public function getAllPlayers()
    {        
        $allPlayer = $this->player->get();
        return response()->json(['data' => $allPlayer],200);
    }

    // Get Specific Player
    public function getSpecificPlayer($id)
    {
        $Player = $this->player::find($id);

        if (!$Player) {
            return response()->json(['message' => 'Player not found!']);
        }

        return response()->json($Player,200);
    }

    // Update player
    public function updatePlayer(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'posisi' => 'required|string',
            'name' => 'required|string',
            'nomer_punggung' => 'required|string',
            'updated_by' => 'required|string',
        ]);

        if ($validator->fails()) {
            \Log::error($validator->errors());
            return response()->json($validator->errors());
        }

        $player = $this->player::find($id);

        if (!$player) {
            return response()->json(['message' => 'No player found!']);
        }

        $player->update([
            'posisi' => $request->input('posisi'),
            'name' => $request->input('name'),
            'nomer_punggung' => $request->input('nomer_punggung'),
            'updated_by' => $request->input('updated_by')
        ]);

         return response()->json([
            'message' => 'success update player!',
            'data' => $player
        ], 200);

    }

    // Delete player
    public function deletePlayer(Request $request, $id) 
    {
        $player = $this->player::destroy($id);

        if (!$player) {
            return response()->json(['message' => 'no player found!']);
        }

        return response()->json([
            'message' => "success delete player! with id : $id"
        ]);
    }
}
