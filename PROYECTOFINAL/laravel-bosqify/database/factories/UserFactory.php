<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'userEmail' => $this->faker->name(),
            'userPass' => $this->faker->name(),
            'userName' => $this->faker->name(),
            'userProfilePicture' => $this->faker->name(),
            'userDescription' => $this->faker->name(),
            'api_token' => Str::random(80),
            'signUpDate' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
