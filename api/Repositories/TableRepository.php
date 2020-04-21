<?php

/**
 * The repository for tables.
 */

declare(strict_types=1);

namespace Api\Repositories;

use Api\Models\Table;

class TableRepository
{
    private $db;

    /**
     * The constructor.
     * @param \PDO $db The database connection.
     */
    public function __construct(\PDO $db)
    {
        $this->db = $db;
    }

    /**
     * Find all tables.
     * @return Table[] The tables.
     */
    public function findAll(): array
    {
        $tables = [];

        $sql =
            "SELECT *
            FROM table_reservation_tables";

        $statement = $this->db->query($sql);
        foreach ($statement as $row) {
            $table = new Table((int)$row['id'], $row['name'], $row['description'], $row['warning']);
            $tables[] = $table;
        }

        return $tables;
    }
}
