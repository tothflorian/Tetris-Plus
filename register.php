<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

$username = $_POST['username'];
$password = $_POST['password'];
$repeat = $_POST['repeat-password'];

if (!preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username)) {
    echo json_encode(["success" => false, "error" => "Invalid format! Username must be 3-20 characters long."]);
    exit;
}
if (!preg_match('/^[a-zA-Z0-9_]{3,24}$/', $password)) {
    echo json_encode(["success" => false, "error" => "Invalid format! Password must be 3-24 characters long."]);
    exit;
}
if ($password !== $repeat) {
    echo json_encode(["success" => false, "error" => "Invalid format! Passwords do not match!"]);
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $hashed);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Successful registration!"]);
    }
    else {
        echo json_encode(["success" => false, "error" => $conn->error]);
        exit;
    }
}
catch (mysqli_sql_exception $e) {
    echo json_encode(["success" => false, "error" => "This user already exists!"]);
    exit;
}
