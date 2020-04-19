<?php

declare(strict_types=1);

namespace Api\Tests\Controllers;

use Api\Controllers\BaseController;
use Api\Models\Response;
use PHPUnit\Framework\TestCase;

class BaseControllerTest extends TestCase
{
    public function testCorrectStatusCodeForEncodingError(): void
    {
        $baseControllerStub = $this->getMockForAbstractClass(BaseController::class);

        $response = $baseControllerStub->defineEncodingError();

        $this->assertInstanceOf(Response::class, $response);
        $this->assertEquals(500, $response->statusCode);
    }

    public function testCorrectStatusCodeForUnsupportedMethod(): void
    {
        $baseControllerStub = $this->getMockForAbstractClass(BaseController::class);

        $response = $baseControllerStub->defineUnsupportedMethod();

        $this->assertInstanceOf(Response::class, $response);
        $this->assertEquals(405, $response->statusCode);
    }
}
