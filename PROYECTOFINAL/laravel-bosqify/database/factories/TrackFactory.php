<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\tracks>
 */
class TrackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'trackName' => $this->faker->name(),
            'trackDuration' => rand(1,10),
            'trackArtist' => $this->faker->name(),
            'trackGenre' => $this->faker->name(),
            'trackImage' => $this->faker->name(),
            'trackAddedToPlaylist' => rand(1,10),
            'trackLikes' => rand(1,10),
            'idUser' => rand(1,10)
        ];
    }
}
