<?php

$config = parse_ini_file("config.env");

$host = $config['DB_HOST'];
$user = $config['DB_USER'];
$dbname = $config['DB_NAME'];
$pass = $config['DB_PASS'];

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";