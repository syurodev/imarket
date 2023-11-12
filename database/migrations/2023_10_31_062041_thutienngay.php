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
        Schema::create('thutienngay', function (Blueprint $table) {
            $table->date('Date')->primary();
            $table->foreignId('MaThu');
            $table->foreignId('MaKios');
            $table->integer('TongThu');
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
