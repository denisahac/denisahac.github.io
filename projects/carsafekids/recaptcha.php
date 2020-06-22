<?php

if (!isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
  header('HTTP/1.0 403 Forbidden');
  die('You are not allowed to access this file.');     
}

header('Content-type: application/json');

$url = $_GET['url'];
$response = $_GET['response'];
$secret = $_GET['secret']; 

$json = file_get_contents($url  . '?secret=' . $secret . '&response=' . $response);

echo $json;