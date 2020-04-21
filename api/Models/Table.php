<?php

/**
 * The model of a table.
 */

declare(strict_types=1);

namespace Api\Models;

class Table implements \JsonSerializable
{
    private $id;
    private $name;
    private $description;
    private $warning;

    /**
     * The constructor.
     * @param int $id The unqiue identifier.
     * @param string $name The name.
     * @param string $description The description.
     * @param string $warning The warning.
     */
    public function __construct(int $id, string $name, string $description, string $warning)
    {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->warning = $warning;
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
     * Get the description.
     * @return string The description.
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * Get the warning.
     * @return string The warning.
     */
    public function getWarning(): string
    {
        return $this->warning;
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
