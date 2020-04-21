<?php

/**
 * The database.
 */

declare(strict_types=1);

namespace Api\Config;

use Api\Constants\DbConstants;

class Database
{
    private $dbConnection;

    /**
     * The constructor.
     */
    public function __construct()
    {
        try {
            $dsn = "mysql:host=" . DbConstants::DB_HOST . ";port=" . DbConstants::DB_PORT . ";charset=utf8mb4;dbname="
                . DbConstants::DB_NAME;
            $this->dbConnection = new \PDO($dsn, DbConstants::DB_USERNAME, DbConstants::DB_PASSWORD);
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
