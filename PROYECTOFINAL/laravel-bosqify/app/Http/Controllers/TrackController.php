<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TrackController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function show(Request $request)
    {
        $track = Track::find($request->idTrack);
    
        if ($track) {
            $trackName = $track->trackName;
            $baseUrl = $request->root();
            $trackPath = $baseUrl . '/tracks/' . $trackName . '.mp3';
            $imagePath = $baseUrl . '/img/tracksImg/' . $trackName . '.jpg';
    
            if (file_exists(public_path('tracks/' . $trackName . '.mp3'))) {
                $trackUrl = $baseUrl . '/tracks/' . $trackName . '.mp3';
            }
            if (file_exists(public_path('img/tracksImg/' . $request->idTrack . '.png'))) {
                $imageUrl = $baseUrl . '/img/tracksImg/' . $request->idTrack . '.png';
            } else {
                $imageUrl = $baseUrl . '/img/tracksImg/default.jpg';
            }
            return response()->json(['url' => $trackUrl, 'img' => $imageUrl]);
        }
    
        $error = 'La canción no existe';
        if (isset($trackName)) {
            $error .= ': ' . $trackPath;
        }
    
        return response()->json(['error' => $error], 404);
    }
     
     
    public function store(Request $request)
    {
        $trackPath = public_path('tracks');
        $trackImage = public_path('img/tracksImg');

        if ($request->hasFile('mp3File')) {
            $file = $request->file('mp3File');
            $filename = $request->input('name') ?? $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $newFilename = $filename . '.' . $extension;
            $file->move($trackPath, $newFilename);

            // Obtener el nombre de la imagen y guardarla en el campo trackImage
            $imageName = '';
            if ($request->hasFile('trackImage')) {
                $image = $request->file('trackImage');

                // Generar un nombre único para la imagen usando el idTrack
                $idTrack = Track::max('idTrack') + 1;
                $extension = $image->getClientOriginalExtension();
                $imageName = $idTrack . '.' . $extension;
                $image->move($trackImage, $imageName);
            }

            $name = empty($request->input('name')) ? pathinfo($newFilename, PATHINFO_FILENAME) : $request->input('name');
            $option = $request->input('option');

            $track = new Track();
            $track->trackName = $name;
            $track->trackDuration = '';
            $track->trackGenre = $option;
            $track->trackImage = 'img/tracksImg/' . $imageName;
            $track->trackArtist = auth()->user()->userName;
            $track->idUser = auth()->user()->id;
            $track->save();

            return response()->json(['message' => 'Pista subida exitosamente'], 200);
        }

        return response()->json(['message' => 'Error al subir el archivo MP3'], 400);
    }

    public function delete(Request $request)
    {
        $trackId = $request->input('idTrack');
        $track = Track::find($trackId);

        if (!$track) {
            return response()->json(['message' => 'La pista no existe'], 404);
        }

        // Eliminar la imagen de la pista si existe
        if ($track->image) {
            unlink(public_path($track->image));
        }

        // Eliminar la pista de audio
        unlink(public_path($track->audio));

        // Eliminar la pista de la base de datos
        $track->delete();

        return response()->json(['message' => 'La pista ha sido eliminada']);
    }

    public function update(Request $request)
    {
        $trackId = $request->input('idTrack');
        $newTrackName = $request->input('trackName');
        $track = Track::find($trackId);

        if (!$track) {
            return response()->json(['message' => 'La pista no existe'], 404);
        }

        $oldAudioPath = public_path($track->audio);
        $newAudioPath = str_replace($track->name, $newTrackName, $oldAudioPath);
        rename($oldAudioPath, $newAudioPath);

        if ($track->image) {
            $oldImagePath = public_path($track->image);
            $newImagePath = str_replace($track->name, $newTrackName, $oldImagePath);
            rename($oldImagePath, $newImagePath);
        }

        $track->name = $newTrackName;
        $track->audio = str_replace(public_path(), '', $newAudioPath);
        $track->image = isset($newImagePath) ? str_replace(public_path(), '', $newImagePath) : null;
        $track->save();

        return response()->json(['message' => 'La pista ha sido actualizada']);
    }


    public function getUserTracks(Request $request) {
        $tracks = Track::where('idUser', auth()->user()->id)->get();
        return response()->json(['tracks' => $tracks], 200);
    }
}
