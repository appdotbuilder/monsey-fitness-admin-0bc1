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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'trainer', 'staff'])->default('staff')->after('email_verified_at');
            $table->decimal('commission_rate', 5, 4)->nullable()->after('role')->comment('Trainer commission rate (0.0000 to 1.0000)');
            $table->boolean('is_active')->default(true)->after('commission_rate');
            $table->string('phone')->nullable()->after('is_active');
            $table->text('bio')->nullable()->after('phone');
            $table->json('specialties')->nullable()->after('bio')->comment('Trainer specialties/certifications');
            
            $table->index('role');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'commission_rate', 'is_active', 'phone', 'bio', 'specialties']);
        });
    }
};