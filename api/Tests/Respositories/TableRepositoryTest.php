<?php

declare(strict_types=1);

namespace Api\Tests\Respositories;

use Api\Models\Table;
use Api\Repositories\TableRepository;
use PHPUnit\Framework\TestCase;

class TableRepositoryTest extends TestCase
{
    private static $db;

    public static function setUpBeforeClass(): void
    {
        self::$db = new \PDO("sqlite::memory:");
        self::$db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        $create_sql =
            "CREATE TABLE table_reservation_tables (
             id INTEGER PRIMARY KEY,
             name TEXT,
             description TEXT,
             warning TEXT)";
            
        self::$db->exec($create_sql);
    }

    public function testNoTablesForFindAll(): void
    {
        $repository = new TableRepository(self::$db);
        $tables = $repository->findAll();

        $this->assertSame(0, count($tables));
    }

    public function testOneTableForFindAll(): void
    {
        $data = [
            [
                "name" => "Table 1",
                "description" => "This is a small table.",
                "warning" => "This table is very small."
            ]
        ];

        $insert_sql =
            "INSERT INTO table_reservation_tables (name, description, warning)
             VALUES (:name, :description, :warning)";
        $statement = self::$db->prepare($insert_sql);

        foreach ($data as $entry) {
            $statement->execute([
                "name" => $entry["name"],
                "description" => $entry["description"],
                "warning" => $entry["warning"]
            ]);
        }

        $repository = new TableRepository(self::$db);
        $tables = $repository->findAll();

        $this->assertSame(1, count($tables));
    }

    public function testMultiTablesForFindAll(): void
    {
        $data = [
            [
                "name" => "Table 1",
                "description" => "This is a small table.",
                "warning" => "This table is very small."
            ],
            [
                "name" => "Table 2",
                "description" => "This is a big table.",
                "warning" => "This table can be too big."
            ]
        ];

        $insert_sql =
            "INSERT INTO table_reservation_tables (name, description, warning)
             VALUES (:name, :description, :warning)";
        $statement = self::$db->prepare($insert_sql);

        foreach ($data as $entry) {
            $statement->execute([
                "name" => $entry["name"],
                "description" => $entry["description"],
                "warning" => $entry["warning"]
            ]);
        }

        $repository = new TableRepository(self::$db);
        $tables = $repository->findAll();

        $this->assertSame(2, count($tables));
    }

    public function testCorrectPropsFromFindAll(): void
    {
        $data = [
            [
                "name" => "Table 1",
                "description" => "This is a small table.",
                "warning" => "This table is very small."
            ]
        ];

        $insert_sql =
            "INSERT INTO table_reservation_tables (name, description, warning)
             VALUES (:name, :description, :warning)";
        $statement = self::$db->prepare($insert_sql);

        foreach ($data as $entry) {
            $statement->execute([
                "name" => $entry["name"],
                "description" => $entry["description"],
                "warning" => $entry["warning"]
            ]);
        }

        $repository = new TableRepository(self::$db);
        $tables = $repository->findAll();

        $this->assertInstanceOf(Table::class, $tables[0]);
        $this->assertSame($data[0]["name"], $tables[0]->getName());
        $this->assertSame($data[0]["description"], $tables[0]->getDescription());
        $this->assertSame($data[0]["warning"], $tables[0]->getWarning());
    }

    public function tearDown(): void
    {
        $truncate_sql = "DELETE FROM table_reservation_tables";
        self::$db->exec($truncate_sql);
    }
}
