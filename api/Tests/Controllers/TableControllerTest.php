<?php

declare(strict_types=1);

namespace Api\Tests\Controllers;

use Api\Constants\ApiConstants;
use Api\Controllers\TableController;
use Api\Models\Table;
use Api\Repositories\TableRepository;
use PHPUnit\Framework\TestCase;

class TableControllerTest extends TestCase
{
    public function supressEcho(): void
    {
        $this->setOutputCallback(function () {
            return;
        });
    }

    public function testUnsuccessfulStatusCodeForGetAllTables(): void
    {
        $tableRepositoryStub = $this->createStub(TableRepository::class);
        $tableRepositoryStub->method("findAll")
                            ->will($this->throwException(new \Exception()));

        $this->supressEcho();

        $tableController = new TableController($tableRepositoryStub);
        $tableController->processRequest(ApiConstants::GET_REQUEST_METHOD);
        
        $this->assertGreaterThan(299, http_response_code());
    }

    public function testSuccessfulStatusCodeForGetAllTables(): void
    {
        $tableRepositoryStub = $this->createStub(TableRepository::class);
        $tableRepositoryStub->method("findAll")
                            ->willReturn([]);

        $this->supressEcho();

        $tableController = new TableController($tableRepositoryStub);
        $tableController->processRequest(ApiConstants::GET_REQUEST_METHOD);
        
        $this->assertThat(
            http_response_code(),
            $this->logicalAnd(
                $this->greaterThan(199),
                $this->lessThan(300)
            )
        );
    }

    public function testEmptyDataForGetAllTables(): void
    {
        $tableRepositoryStub = $this->createStub(TableRepository::class);
        $tableRepositoryStub->method("findAll")
                            ->willReturn([]);

        $this->expectOutputRegex("/\[]/");

        $tableController = new TableController($tableRepositoryStub);
        $tableController->processRequest(ApiConstants::GET_REQUEST_METHOD);
    }

    public function testPresentDataForGetAllTables(): void
    {
        $tables = [
            new Table(1, "Table 1", "This is a small table.", "This table is very small.")
        ];

        $tableRepositoryStub = $this->createStub(TableRepository::class);
        $tableRepositoryStub->method("findAll")
                            ->willReturn($tables);

        $this->expectOutputRegex("/1/");
        $this->expectOutputRegex("/Table 1/");
        $this->expectOutputRegex("/This is a small table\./");
        $this->expectOutputRegex("/This table is very small\./");

        $tableController = new TableController($tableRepositoryStub);
        $tableController->processRequest(ApiConstants::GET_REQUEST_METHOD);
    }

    public function testUnsupportedMethod(): void
    {
        $tableRepositoryStub = $this->createStub(TableRepository::class);
        $tableController = new TableController($tableRepositoryStub);
        $tableController->processRequest('RANDOM');
        
        $this->assertGreaterThan(299, http_response_code());
    }

    public function testJSONEncodingError(): void
    {
        $tableRepositoryStub = $this->createStub(TableRepository::class);
        $tableRepositoryStub->method("findAll")
                            ->willReturn([NAN]);

        $tableController = new TableController($tableRepositoryStub);
        $tableController->processRequest(ApiConstants::GET_REQUEST_METHOD);
        
        $this->assertGreaterThan(299, http_response_code());
    }
}
