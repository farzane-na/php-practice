<?php
header('Content-Type:application/json');
try{
    $pdo = new PDO('mysql:host=localhost;dbname=my_shop', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->query('SELECT * FROM users');
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
} catch (PDOException $e) {
    echo json_encode([
        'error' => 'Connection failed: ' . $e->getMessage()
    ]);
}