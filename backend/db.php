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
