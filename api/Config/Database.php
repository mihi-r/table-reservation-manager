<?php

/**
 * The database.
 */

declare(strict_types=1);

namespace Api\Config;

use Api\Constants\Constants;

class Database
{
    private $dbConnection;

    /**
     * The constructor.
     */
    public function __construct()
    {
        try {
            $dsn = "mysql:host=" . Constants::DB_HOST . ";port=" . Constants::DB_PORT . ";charset=utf8mb4;dbname="
                . Constants::DB_NAME;
            $this->dbConnection = new \PDO($dsn, Constants::DB_USERNAME, Constants::DB_PASSWORD);
        } catch (\PDOException $e) {
            die($e->getMessage());
        }
    }

    /**
     * Gets the database connection after initialization.
     * @return \PDO The database connection.
     */
    public function getConnection(): \PDO
    {
        return $this->dbConnection;
    }
}
