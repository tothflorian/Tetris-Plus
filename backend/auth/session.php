<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["username"])) {
    $_SESSION["username"] = "Guest";
}

echo json_encode([
    "loggedIn" => (isset($_SESSION["username"]) && $_SESSION["username"] !== "Guest"),
    "username" => $_SESSION["username"]
]);
