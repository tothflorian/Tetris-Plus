<?php
require 'db.php';

$username = $_GET["username"];

$stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();

$stmt->bind_result($user_id);
$stmt->fetch();

$stmt->close();

echo json_encode(["user_id" => $user_id]);
