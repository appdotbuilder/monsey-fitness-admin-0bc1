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
        Schema::create('memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->string('type');
            $table->decimal('monthly_fee', 8, 2);
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->date('next_billing_date');
            $table->enum('status', ['active', 'paused', 'cancelled', 'expired'])->default('active');
            $table->boolean('auto_renew')->default(true);
            $table->string('card_token')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index('client_id');
            $table->index('status');
            $table->index('next_billing_date');
            $table->index(['status', 'next_billing_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('memberships');
    }
};