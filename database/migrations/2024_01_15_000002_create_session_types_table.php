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
        Schema::create('session_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('duration_minutes')->default(60);
            $table->decimal('price', 8, 2);
            $table->integer('max_participants')->nullable();
            $table->boolean('is_class')->default(false);
            $table->boolean('is_active')->default(true);
            $table->string('color', 7)->default('#3b82f6')->comment('Hex color for calendar display');
            $table->timestamps();
            
            $table->index('is_active');
            $table->index('is_class');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_types');
    }
};