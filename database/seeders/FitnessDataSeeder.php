<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Payment;
use App\Models\Session;
use App\Models\SessionType;
use App\Models\User;
use Illuminate\Database\Seeder;

class FitnessDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@monseyfitness.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'is_active' => true,
            'phone' => '555-0100',
        ]);

        // Create trainers
        $trainers = User::factory(5)->create([
            'role' => 'trainer',
            'is_active' => true,
            'commission_rate' => 0.3,
        ]);

        // Create session types
        $sessionTypes = [
            [
                'name' => 'Personal Training',
                'description' => 'One-on-one training session',
                'duration_minutes' => 60,
                'price' => 75.00,
                'max_participants' => 1,
                'is_class' => false,
                'color' => '#3b82f6',
            ],
            [
                'name' => 'Yoga Class',
                'description' => 'Relaxing yoga session for all levels',
                'duration_minutes' => 75,
                'price' => 25.00,
                'max_participants' => 20,
                'is_class' => true,
                'color' => '#10b981',
            ],
            [
                'name' => 'CrossFit',
                'description' => 'High-intensity functional fitness',
                'duration_minutes' => 60,
                'price' => 30.00,
                'max_participants' => 15,
                'is_class' => true,
                'color' => '#f59e0b',
            ],
            [
                'name' => 'Pilates',
                'description' => 'Core strengthening and flexibility',
                'duration_minutes' => 60,
                'price' => 28.00,
                'max_participants' => 12,
                'is_class' => true,
                'color' => '#8b5cf6',
            ],
            [
                'name' => 'HIIT Class',
                'description' => 'High-intensity interval training',
                'duration_minutes' => 45,
                'price' => 22.00,
                'max_participants' => 18,
                'is_class' => true,
                'color' => '#ef4444',
            ],
        ];

        foreach ($sessionTypes as $typeData) {
            SessionType::create($typeData);
        }

        // Create clients
        $clients = Client::factory(50)->create();

        // Assign trainers to some clients
        $clients->each(function ($client) use ($trainers) {
            if (random_int(1, 100) <= 70) { // 70% chance of having an assigned trainer
                $client->update([
                    'assigned_trainer_id' => $trainers->random()->id,
                ]);
            }
        });

        // Create sessions for today and upcoming days
        $sessionTypes = SessionType::all();
        $today = now();
        
        // Create sessions for today
        for ($i = 0; $i < 8; $i++) {
            Session::create([
                'session_type_id' => $sessionTypes->random()->id,
                'trainer_id' => $trainers->random()->id,
                'title' => $sessionTypes->random()->name,
                'start_time' => $today->copy()->addHours(8 + $i),
                'end_time' => $today->copy()->addHours(9 + $i),
                'status' => 'scheduled',
            ]);
        }

        // Create some completed sessions from the past
        Session::factory(30)->create([
            'status' => 'completed',
            'start_time' => fake()->dateTimeBetween('-30 days', '-1 day'),
        ]);

        // Create payments
        Payment::factory(100)->create([
            'client_id' => $clients->random()->id,
            'status' => 'completed',
        ]);

        // Create some pending/failed payments
        Payment::factory(10)->create([
            'client_id' => $clients->random()->id,
            'status' => fake()->randomElement(['pending', 'failed']),
        ]);
    }
}