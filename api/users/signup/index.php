<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$path1 = $path . "/api/config/config.php";

include_once($path1);


include_once('./SignupController.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Allow-Origin");

$controller = new SignupController($conn, $requestMethod);
echo $controller->processRequest();
