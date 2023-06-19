<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    protected $table = 'genre';

    protected $fillable = [
        'genreName',
        'genreImg',
    ];
    public function getDescriptionAttr($value) {
        return substr($value,1,120);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }
}
