<?php

namespace Database\Factories;

use App\Models\Session;
use App\Models\SessionType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Session>
 */
class SessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startTime = fake()->dateTimeBetween('today', '+7 days');
        $endTime = clone $startTime;
        $endTime->modify('+60 minutes');

        return [
            'session_type_id' => SessionType::factory(),
            'trainer_id' => User::factory(),
            'title' => fake()->words(3, true),
            'description' => fake()->optional()->sentence(),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'status' => fake()->randomElement(['scheduled', 'completed', 'cancelled']),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}