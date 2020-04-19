<?php

/**
 * The base controller.
 */

declare(strict_types=1);

namespace Api\Controllers;

use Api\Models\Response;

abstract class BaseController
{
    /**
     * Sets an internal server error when JSON encoding fails.
     * @return Response The response.
     */
    public function defineEncodingError(): Response
    {
        $response = new Response();
        $response->statusCode = 500;
        return $response;
    }

    /**
     * Defines a response when an unsupported HTTP method is supplied.
     * @return Response The response.
     */
    public function defineUnsupportedMethod(): Response
    {
        $response = new Response();
        $response->statusCode = 405;

        return $response;
    }
}
