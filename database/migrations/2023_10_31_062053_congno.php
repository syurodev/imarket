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
        Schema::create('congno', function (Blueprint $table) {
            $table->string('MaKhachHang')->primary();
            $table->foreignId('MaKios');
            $table->foreignId('MaThu');
            $table->integer('TienNo');
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
