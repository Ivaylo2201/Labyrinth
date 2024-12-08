<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FixForeignKeyOnPropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Drop the existing foreign key constraint (if it exists)
        Schema::table('properties', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });

        // Add the foreign key constraint again with ON DELETE CASCADE
        Schema::table('properties', function (Blueprint $table) {
            $table->foreign('user_id')
                  ->references('id')->on('users')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Drop the foreign key constraint
        Schema::table('properties', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
    }
}
