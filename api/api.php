<?php

/**
 * The front controller and entry point of the REST API.
 */

declare(strict_types=1);

require '../vendor/autoload.php';

use Api\Config\Database;
use Api\Constants\Constants;
use Api\Controllers\AdminController;
use Api\Repositories\AdminRepository;

header("Access-Control-Allow-Origin: https://tribunal.uc.edu");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Max-Age: 3600");

$db = (new Database())->getConnection();

$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$pathComponents = explode("/", $path);

if (array_key_exists(4, $pathComponents) && $pathComponents[4] === Constants::ADMIN_URL_PATH) {
    $repository = new AdminRepository($db);
    $controller = new AdminController($repository);
    $controller->processRequest($_SERVER["REQUEST_METHOD"]);
} else {
    http_response_code(404);
}
