<?php
$host = "mysql.caesar.elte.hu";
$user = "tothflorian";
$dbname = "tothflorian";
$pass = ""; //password missing

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";