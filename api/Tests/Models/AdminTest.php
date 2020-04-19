<?php

declare(strict_types=1);

namespace Api\Tests\Models;

use Api\Models\Admin;
use PHPUnit\Framework\TestCase;

class AdminTest extends TestCase
{
    public function testCorrectDataFromGetters(): void
    {
        $admin = new Admin(1, "Bob Ross", "bob.ross@gmail.com");

        $this->assertEquals(1, $admin->getId());
        $this->assertEquals("Bob Ross", $admin->getName());
        $this->assertEquals("bob.ross@gmail.com", $admin->getEmail());
    }

    public function testJsonSerialization(): void
    {
        $admin = new Admin(1, "Bob Ross", "bob.ross@gmail.com");
        $json = $admin->jsonSerialize();

        $this->assertEquals(1, $json["id"]);
        $this->assertEquals("Bob Ross", $json["name"]);
        $this->assertEquals("bob.ross@gmail.com", $json["email"]);
    }
}
