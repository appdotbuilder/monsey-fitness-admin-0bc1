<?php

namespace Database\Factories;

use App\Models\SessionType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SessionType>
 */
class SessionTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sessionTypes = [
            ['name' => 'Personal Training', 'is_class' => false, 'max_participants' => 1, 'duration' => 60, 'price' => 75],
            ['name' => 'Yoga Class', 'is_class' => true, 'max_participants' => 20, 'duration' => 75, 'price' => 25],
            ['name' => 'CrossFit', 'is_class' => true, 'max_participants' => 15, 'duration' => 60, 'price' => 30],
            ['name' => 'Pilates', 'is_class' => true, 'max_participants' => 12, 'duration' => 60, 'price' => 28],
            ['name' => 'HIIT Class', 'is_class' => true, 'max_participants' => 18, 'duration' => 45, 'price' => 22],
            ['name' => 'Strength Training', 'is_class' => true, 'max_participants' => 10, 'duration' => 60, 'price' => 25],
        ];

        $type = fake()->randomElement($sessionTypes);

        return [
            'name' => $type['name'],
            'description' => fake()->sentence(),
            'duration_minutes' => $type['duration'],
            'price' => $type['price'],
            'max_participants' => $type['max_participants'],
            'is_class' => $type['is_class'],
            'is_active' => fake()->boolean(90),
            'color' => fake()->hexColor(),
        ];
    }
}