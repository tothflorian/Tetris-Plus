<?php
session_start();
require '../db.php';

header('Content-Type: application/json');

$username = $_POST['username'];
$password = $_POST['password'];

if (!preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username)) {
    echo json_encode(["success" => false, "error" => "Invalid format! Username must be 3-20 characters long."]);
    exit;
}
if (!preg_match('/^[a-zA-Z0-9_]{3,24}$/', $password)) {
    echo json_encode(["success" => false, "error" => "Invalid format! Password must be 3-24 characters long."]);
    exit;
}

$stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(["success" => false, "error" => "Invalid credentials!"]);
    exit;
}

$stmt->bind_result($id, $hashed_password);
$stmt->fetch();

if (password_verify($password, $hashed_password)) {
    $_SESSION['user_id'] = $id;
    $_SESSION['username'] = $username;

    echo json_encode(["success" => true, "message" => "Successfully logged in! Redirecting..."]);
}
else
    echo json_encode(["success" => false, "error" => "Invalid credentials!"]);
