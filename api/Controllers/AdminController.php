<?php

/**
 * The controller to handle admin API logic.
 */

declare(strict_types=1);

namespace Api\Controllers;

use Api\Constants\Constants;
use Api\Controllers\BaseController;
use Api\Models\Response;
use Api\Repositories\AdminRepository;

class AdminController extends BaseController
{
    private $repository;

    /**
     * The constructor.
     * @param AdminRepository $adminRepository The admin repository.
     */
    public function __construct(AdminRepository $adminRepository)
    {
        $this->repository = $adminRepository;
    }

    /**
     * Processes the incoming request.
     * @param string $requestMethod The HTTP request method.
     */
    public function processRequest(string $requestMethod)
    {
        $response = null;
        switch ($requestMethod) {
            case Constants::GET_REQUEST_METHOD:
                $response = $this->getAllAdmins();
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
     * Get all admins.
     * @return Response The response.
     */
    private function getAllAdmins(): Response
    {
        $response = new Response();
        $response->body = new \stdClass();

        try {
            $admins = $this->repository->findAll();
            $response->body->data = $admins;
            $response->statusCode = 200;
        } catch (\Exception $e) {
            error_log($e->getMessage());
            $response->body->message = 'Failed to retrieve admin information.';
            $response->statusCode = 500;
        }

        return $response;
    }
}
