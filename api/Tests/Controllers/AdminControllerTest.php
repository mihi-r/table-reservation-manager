<?php

declare(strict_types=1);

namespace Api\Tests\Controllers;

use Api\Constants\ApiConstants;
use Api\Controllers\AdminController;
use Api\Models\Admin;
use Api\Repositories\AdminRepository;
use PHPUnit\Framework\TestCase;

class AdminControllerTest extends TestCase
{
    public function supressEcho(): void
    {
        $this->setOutputCallback(function () {
            return;
        });
    }

    public function testUnsuccessfulStatusCodeForGetAllAdmins(): void
    {
        $adminRepositoryStub = $this->createStub(AdminRepository::class);
        $adminRepositoryStub->method("findAll")
                            ->will($this->throwException(new \Exception()));

        $this->supressEcho();

        $adminController = new AdminController($adminRepositoryStub);
        $adminController->processRequest(ApiConstants::GET_REQUEST_METHOD);
        
        $this->assertGreaterThan(299, http_response_code());
    }

    public function testSuccessfulStatusCodeForGetAllAdmins(): void
    {
        $adminRepositoryStub = $this->createStub(AdminRepository::class);
        $adminRepositoryStub->method("findAll")
                            ->willReturn([]);

        $this->supressEcho();

        $adminController = new AdminController($adminRepositoryStub);
        $adminController->processRequest(ApiConstants::GET_REQUEST_METHOD);
        
        $this->assertThat(
            http_response_code(),
            $this->logicalAnd(
                $this->greaterThan(199),
                $this->lessThan(300)
            )
        );
    }

    public function testEmptyDataForGetAllAdmins(): void
    {
        $adminRepositoryStub = $this->createStub(AdminRepository::class);
        $adminRepositoryStub->method("findAll")
                            ->willReturn([]);

        $this->expectOutputRegex("/\[]/");

        $adminController = new AdminController($adminRepositoryStub);
        $adminController->processRequest(ApiConstants::GET_REQUEST_METHOD);
    }

    public function testPresentDataForGetAllAdmins(): void
    {
        $admins = [
            new Admin(1, "Bob Ross", "bob.ross@gmail.com")
        ];

        $adminRepositoryStub = $this->createStub(AdminRepository::class);
        $adminRepositoryStub->method("findAll")
                            ->willReturn($admins);

        $this->expectOutputRegex("/1/");
        $this->expectOutputRegex("/Bob Ross/");
        $this->expectOutputRegex("/bob\.ross@gmail\.com/");

        $adminController = new AdminController($adminRepositoryStub);
        $adminController->processRequest(ApiConstants::GET_REQUEST_METHOD);
    }

    public function testUnsupportedMethod(): void
    {
        $adminRepositoryStub = $this->createStub(AdminRepository::class);
        $adminController = new AdminController($adminRepositoryStub);
        $adminController->processRequest('RANDOM');
        
        $this->assertGreaterThan(299, http_response_code());
    }

    public function testJSONEncodingError(): void
    {
        $adminRepositoryStub = $this->createStub(AdminRepository::class);
        $adminRepositoryStub->method("findAll")
                            ->willReturn([NAN]);

        $adminController = new AdminController($adminRepositoryStub);
        $adminController->processRequest(ApiConstants::GET_REQUEST_METHOD);
        
        $this->assertGreaterThan(299, http_response_code());
    }
}
