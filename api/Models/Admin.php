<?php

/**
 * The model of an Admin.
 */

declare(strict_types=1);

namespace Api\Models;

class Admin implements \JsonSerializable
{
    private $id;
    private $name;
    private $email;

    /**
     * The constructor.
     * @param int $id The unqiue identifier.
     * @param string $name The name.
     * @param string $email The email.
     */
    public function __construct(int $id, string $name, string $email)
    {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
    }

    /**
     * Get the id.
     * @return int The id.
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Get the name.
     * @return string The name.
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Get the email.
     * @return string The email.
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * Serialize data to JSON.
     * @return array An associative array of defined object accessible non-static
     *     properties for the specified object in scope.
     */
    public function jsonSerialize(): array
    {
        return get_object_vars($this);
    }
}
