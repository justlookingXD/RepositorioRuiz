<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('id')->nullable(false);
            $table->string('email', 254)->nullable(false);
            $table->string('password', 254)->nullable(false);
            $table->string('userName', 254)->nullable(false);
            $table->string('userProfilePicture', 254)->default('default.jpg');
            $table->string('userDescription', 254)->nullable();
            $table->timestamp('signUpDate')->useCurrent();
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
        Schema::dropIfExists('users');
    }
}
