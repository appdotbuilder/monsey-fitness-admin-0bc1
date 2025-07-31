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
        Schema::create('referrals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('referrer_client_id')->constrained('clients')->onDelete('cascade');
            $table->foreignId('referred_client_id')->constrained('clients')->onDelete('cascade');
            $table->decimal('credit_amount', 8, 2);
            $table->enum('status', ['pending', 'applied', 'expired'])->default('pending');
            $table->date('expires_at')->nullable();
            $table->timestamp('applied_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index('referrer_client_id');
            $table->index('referred_client_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referrals');
    }
};