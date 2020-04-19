<?php

/**
 * The constants for the REST API.
 */

declare(strict_types=1);

namespace Api\Constants;

class Constants
{
    /**
     * The database host.
     */
    const DB_HOST = "localhost";

    /**
     * The database port.
     */
    const DB_PORT = "8889";

    /**
     * The database name.
     */
    const DB_NAME = "tribunal";

    /**
     * The database username.
     */
    const DB_USERNAME = "root";

    /**
     * The database password.
     */
    const DB_PASSWORD = "root";

    /**
     * The GET HTTP request method.
     */
    const GET_REQUEST_METHOD = "GET";

    /**
     * The path for a request to handle admins.
     */
    const ADMIN_URL_PATH = 'admins';
}
