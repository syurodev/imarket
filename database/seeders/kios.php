<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class kios extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('nguonthukios')->insert(
            [
                'MaThu' => 4,
                'MaNguonThu' => 2,
                'MaKios' => 2,
                'SoTien' => 1500,
                'NgayThu' => now(),
            ]
        );
        /*  for ($i = 1; $i <= 20; $i++) {
            DB::table('matbang')->insert(
                [
                    'MaMatBang' =>  $i,
                    'TenMatBang' => 'Ngành Hàng ' . $i,
                ]
            );
        } */
    }
}
