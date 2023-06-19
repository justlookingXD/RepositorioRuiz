<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    use HasFactory;

    protected $primaryKey = 'idTrack';

    protected $fillable = [
        'trackName',
        'trackDuration',
        'trackGenre',
        'trackImage',
        'trackLikes',
        'idUser'
    ];
    public function getDescriptionAttr($value) {
        return substr($value,1,120);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }
}
