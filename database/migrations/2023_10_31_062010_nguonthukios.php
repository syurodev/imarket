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
        Schema::create('nguonthukios', function (Blueprint $table) {
            $table->string('MaThu')->primary();
            $table->foreignId('MaNguonThu');
            $table->foreignId('MaKios');
            $table->integer('SoTien');
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
