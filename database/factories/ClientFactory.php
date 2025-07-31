<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'date_of_birth' => fake()->date('Y-m-d', '2000-01-01'),
            'emergency_contact' => fake()->name() . ' - ' . fake()->phoneNumber(),
            'medical_notes' => fake()->optional(0.3)->sentence(),
            'status' => fake()->randomElement(['active', 'inactive', 'follow_up']),
            'assigned_trainer_id' => null, // Will be set in seeder
            'outstanding_balance' => fake()->randomFloat(2, 0, 500),
            'waiver_signed' => fake()->boolean(80),
            'waiver_signed_at' => function (array $attributes) {
                return $attributes['waiver_signed'] ? fake()->dateTimeBetween('-1 year', 'now') : null;
            },
        ];
    }
}