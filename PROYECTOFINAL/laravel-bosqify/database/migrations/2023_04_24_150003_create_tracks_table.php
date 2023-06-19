<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTracksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tracks', function (Blueprint $table) {
            $table->id('idTrack')->nullable(false);
            $table->string('trackName', 254)->nullable(false);
            $table->string('trackDuration', 254)->nullable(false);
            $table->unsignedBigInteger('trackGenre');
            $table->string('trackArtist', 254);
            $table->string('trackImage', 254);
            $table->unsignedBigInteger('idUser');
            $table->foreign('idUser')->references('id')->on('users');
            $table->foreign('trackGenre')->references('idGenre')->on('genre');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('track');
    }
}
