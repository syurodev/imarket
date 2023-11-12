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
        Schema::create('khachhang', function (Blueprint $table) {
            $table->string('MaKhachHang')->primary();
            $table->string('HoTen');
            $table->string('SDT');
            $table->string('NgaySinh');
            $table->string('CMND_CCCD');
            $table->string('NgayCap');
            $table->string('NoiCap');
            $table->string('DCTC');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
