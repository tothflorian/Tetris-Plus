<?php
require 'db.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

$user_id = intval($data->user_id);
$score = intval($data->score);

$stmt = $conn->prepare("INSERT INTO leaderboard (user_id, score) VALUES (?, ?)");
$stmt->bind_param("ii", $user_id, $score);
$stmt->execute();

$stmt->close();

echo json_encode(array("status" => true));
