<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_id' => Client::factory(),
            'amount' => fake()->randomFloat(2, 20, 200),
            'type' => fake()->randomElement(['one_time', 'membership', 'package']),
            'method' => fake()->randomElement(['card', 'ach', 'cash', 'check']),
            'status' => fake()->randomElement(['completed', 'pending', 'failed']),
            'transaction_id' => fake()->optional()->uuid(),
            'card_token' => fake()->optional()->uuid(),
            'payment_details' => null,
            'notes' => fake()->optional()->sentence(),
            'processed_at' => function (array $attributes) {
                return $attributes['status'] === 'completed' ? fake()->dateTimeBetween('-30 days', 'now') : null;
            },
        ];
    }
}