<?php

require '../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

try {
    $connection = new mysqli(
        $_ENV["HOSTNAME"], 
        $_ENV["USERNAME"], 
        $_ENV["PASSWORD"],
        $_ENV["DATABASE"], 
    );
} catch(Exception $exception) {
    die("Couldn't make the connection: " . $exception->getMessage() . "\n");
}

if($connection->connect_error) die("Connection failed: " . $connection->connect_error);
if($_GET && boolVal($_GET['debug'])) echo "Connected successfully";