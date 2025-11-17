<?php
session_start();
require 'db.php';

$username = $_POST['username'];
$password = $_POST['password'];
$repeat = $_POST['repeat-password'];

if ($password !== $repeat) {
    echo "Passwords do not match!";
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $hashed);

if ($stmt->execute()) {
    echo "Success!";
} else {
    echo "Error: " . $conn->error;
}