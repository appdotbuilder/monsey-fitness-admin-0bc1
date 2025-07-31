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
        Schema::create('session_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('fitness_sessions')->onDelete('cascade');
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['booked', 'attended', 'no_show', 'cancelled'])->default('booked');
            $table->dateTime('booked_at');
            $table->dateTime('cancelled_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->unique(['session_id', 'client_id']);
            $table->index('client_id');
            $table->index('status');
            $table->index('booked_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_bookings');
    }
};