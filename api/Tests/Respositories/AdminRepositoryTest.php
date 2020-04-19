<?php

declare(strict_types=1);

namespace Api\Tests\Respositories;

use Api\Models\Admin;
use Api\Repositories\AdminRepository;
use PHPUnit\Framework\TestCase;

class AdminRepositoryTest extends TestCase
{
    private static $db;

    public static function setUpBeforeClass(): void
    {
        self::$db = new \PDO("sqlite::memory:");
        self::$db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        $create_sql =
            "CREATE TABLE table_reservation_admins (
             id INTEGER PRIMARY KEY,
             name TEXT,
             email TEXT)";
            
        self::$db->exec($create_sql);
    }

    public function testNoAdminsForFindAll(): void
    {
        $repository = new AdminRepository(self::$db);
        $admins = $repository->findAll();

        $this->assertSame(0, count($admins));
    }

    public function testOneAdminForFindAll(): void
    {
        $data = [
            [
                "name" => "Bob Ross",
                "email" => "bob.ross@gmail.com"
            ]
        ];

        $insert_sql =
            "INSERT INTO table_reservation_admins (name, email)
             VALUES (:name, :email)";
        $statement = self::$db->prepare($insert_sql);

        foreach ($data as $entry) {
            $statement->execute(["name" => $entry["name"], "email" => $entry["email"]]);
        }

        $repository = new AdminRepository(self::$db);
        $admins = $repository->findAll();

        $this->assertSame(1, count($admins));
    }

    public function testMultiAdminsForFindAll(): void
    {
        $data = [
            [
                "name" => "Bob Ross",
                "email" => "bob.ross@gmail.com"
            ],
            [
                "name" => "Alan Turing",
                "email" => "alan.turing@outlook.com"
            ]
        ];

        $insert_sql =
            "INSERT INTO table_reservation_admins (name, email)
             VALUES (:name, :email)";
        $statement = self::$db->prepare($insert_sql);

        foreach ($data as $entry) {
            $statement->execute(["name" => $entry["name"], "email" => $entry["email"]]);
        }

        $repository = new AdminRepository(self::$db);
        $admins = $repository->findAll();

        $this->assertSame(2, count($admins));
    }

    public function testCorrectPropsFromFindAll(): void
    {
        $data = [
            [
                "name" => "Bob Ross",
                "email" => "bob.ross@gmail.com"
            ]
        ];

        $insert_sql =
            "INSERT INTO table_reservation_admins (name, email)
             VALUES (:name, :email)";
        $statement = self::$db->prepare($insert_sql);

        foreach ($data as $entry) {
            $statement->execute(["name" => $entry["name"], "email" => $entry["email"]]);
        }

        $repository = new AdminRepository(self::$db);
        $admins = $repository->findAll();

        $this->assertInstanceOf(Admin::class, $admins[0]);
        $this->assertSame($data[0]["name"], $admins[0]->getName());
        $this->assertSame($data[0]["email"], $admins[0]->getEmail());
    }

    public function tearDown(): void
    {
        $truncate_sql = "DELETE FROM table_reservation_admins";
        self::$db->exec($truncate_sql);
    }
}
