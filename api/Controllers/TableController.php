<?php

/**
 * The controller to handle table API logic.
 */

declare(strict_types=1);

namespace Api\Controllers;

use Api\Constants\ApiConstants;
use Api\Controllers\BaseController;
use Api\Models\Response;
use Api\Repositories\TableRepository;

class TableController extends BaseController
{
    private $repository;

    /**
     * The constructor.
     * @param TableRepository $tableRepository The table repository.
     */
    public function __construct(TableRepository $tableRepository)
    {
        $this->repository = $tableRepository;
    }

    /**
     * Processes the incoming request.
     * @param string $requestMethod The HTTP request method.
     */
    public function processRequest(string $requestMethod)
    {
        $response = null;
        switch ($requestMethod) {
            case ApiConstants::GET_REQUEST_METHOD:
                $response = $this->getAllTables();
                break;
            default:
                $response = $this->defineUnsupportedMethod();
                break;
        }
    
        http_response_code($response->statusCode);
        if ($response->body) {
            $jsonResponse = json_encode($response->body);
            if ($jsonResponse !== false) {
                echo $jsonResponse;
            } else {
                http_response_code($this->defineEncodingError()->statusCode);
            }
        }
    }

    /**
     * Get all tables.
     * @return Response The response.
     */
    private function getAllTables(): Response
    {
        $response = new Response();
        $response->body = new \stdClass();

        try {
            $tables = $this->repository->findAll();
            $response->body->data = $tables;
            $response->statusCode = 200;
        } catch (\Exception $e) {
            error_log($e->getMessage());
            $response->body->message = 'Failed to retrieve table information.';
            $response->statusCode = 500;
        }

        return $response;
    }
}
