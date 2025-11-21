<?php

#$config = parse_ini_file("config.env");

#$host = $config['DB_HOST'];
#$dbname = $config['DB_NAME'];
#$user = $config['DB_USER'];
#$pass = $config['DB_PASS'];

$host = "localhost";
$dbname = "test";
$user = "root";
$pass = "";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

/*
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode([
        "success" => false,
        "error" => "Connection failed: " . $e->getMessage()
    ]);
    exit;
}
*/