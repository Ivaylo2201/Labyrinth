<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('type', 10);
            // address
            $table->decimal('price', 10, 2);
            $table->smallInteger('bathrooms');
            $table->smallInteger('bedrooms');
            $table->decimal('area', 5, 2);
            $table->timestamps();
            $table->string('description');
            // features
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
