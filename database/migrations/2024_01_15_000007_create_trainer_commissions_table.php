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
        Schema::create('trainer_commissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trainer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('session_id')->nullable()->constrained('fitness_sessions')->onDelete('set null');
            $table->foreignId('payment_id')->nullable()->constrained()->onDelete('set null');
            $table->decimal('base_amount', 8, 2);
            $table->decimal('commission_rate', 5, 4);
            $table->decimal('commission_amount', 8, 2);
            $table->enum('status', ['pending', 'paid', 'cancelled'])->default('pending');
            $table->date('period_start');
            $table->date('period_end');
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
            
            $table->index('trainer_id');
            $table->index('status');
            $table->index(['trainer_id', 'period_start', 'period_end']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainer_commissions');
    }
};