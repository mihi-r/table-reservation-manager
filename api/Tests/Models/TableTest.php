<?php

declare(strict_types=1);

namespace Api\Tests\Models;

use Api\Models\Table;
use PHPUnit\Framework\TestCase;

class TableTest extends TestCase
{
    public function testCorrectDataFromGetters(): void
    {
        $table = new Table(1, "Table 1", "This is a small table.", "This table is very small.");

        $this->assertEquals(1, $table->getId());
        $this->assertEquals("Table 1", $table->getName());
        $this->assertEquals("This is a small table.", $table->getDescription());
        $this->assertEquals("This table is very small.", $table->getWarning());
    }

    public function testJsonSerialization(): void
    {
        $table = new Table(1, "Table 1", "This is a small table.", "This table is very small.");
        $json = $table->jsonSerialize();

        $this->assertEquals(1, $json["id"]);
        $this->assertEquals("Table 1", $json["name"]);
        $this->assertEquals("This is a small table.", $json["description"]);
        $this->assertEquals("This table is very small.", $json["warning"]);
    }
}
