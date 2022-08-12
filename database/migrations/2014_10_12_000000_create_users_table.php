<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {

            $table->id();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('gender')->nullable();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('userType')->default('user');
            $table->string('phone')->unique();
            $table->string('email')->unique();
            $table->string('province');
            $table->string('address');
            $table->string('status');
            $table->timestamp('email_verified_at')->nullable();
            $table->boolean('isActivated')->default(0);
            $table->string('passwordResetCode')->nullable();
            $table->string('activationCode')->nullable();
            $table->rememberToken();
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
};
