<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class khachhang extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 20; $i++) {
            DB::table('khachhang')->insert(
                [
                    'MaKhachHang' => fake()->name(),
                    'HoTen' => fake()->name(),
                    'Email' => fake()->unique()->safeEmail(),
                ]
            );
        }
    }
}
