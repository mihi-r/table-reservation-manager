<?php

/**
 * The repository for admins.
 */

declare(strict_types=1);

namespace Api\Repositories;

use Api\Models\Admin;

class AdminRepository
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
     * Find all admins.
     * @return Admin[] The admins.
     */
    public function findAll(): array
    {
        $admins = [];

        $sql =
            "SELECT *
            FROM table_reservation_admins";

        $statement = $this->db->query($sql);
        foreach ($statement as $row) {
            $admin = new Admin((int)$row['id'], $row['name'], $row['email']);
            $admins[] = $admin;
        }

        return $admins;
    }
}
