<?php

/**
 * The constants for the REST API.
 */

declare(strict_types=1);

namespace Api\Constants;

class ApiConstants
{
    /**
     * The GET HTTP request method.
     */
    const GET_REQUEST_METHOD = "GET";

    /**
     * The path for a request to handle admins.
     */
    const ADMIN_URL_PATH = 'admins';

    /**
     * The path for a request to handle tables.
     */
    const TABLE_URL_PATH = 'tables';
}
