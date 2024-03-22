<?php


namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Audio;
use Illuminate\Http\Request;

class AudioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $audio = Audio::create([
            'id_book' => $request->book,
            'pages' => $request->page,
            'cle_page' => $request->keyword,
            'langue' => $request->language,
            'division' => $request->grade,
            'voix' => $request->audio,
        ]);

        // if ($request->hasFile('audio')) {
        //     $file = $request->file('audio');
        //     $audio->update([
        //         'voix' => $file->storeAs('audio_files', $audio->id.'.'.$file->getClientOriginalExtension())
        //     ]);
        // }

        $data['audio'] = $audio;
        $data['status'] = 200;
        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Audio $audio)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Audio $audio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Audio $audio)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Audio $audio)
    {
        //
    }
}
