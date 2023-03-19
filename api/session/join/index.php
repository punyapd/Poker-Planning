<?php
$path = $_SERVER['DOCUMENT_ROOT'];
$path1 = $path . "/api/config/config.php";

include_once($path1);


include_once('./JoinController.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];



header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST , PATCH , OPTIONS");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Allow-Origin");

$controller = new JoinController($conn, $requestMethod);
echo $controller->processRequest();
