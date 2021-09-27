<?php
header("Access-Control-Allow-Origin:*");
header('Content-Type: application/json');
$url = $_POST['url'] or die(var_dump($_POST));

// init curl object        
$ch = curl_init();

// define options
$optArray = array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true
);

// apply those options
curl_setopt_array($ch, $optArray);

// execute request and get response
$result = curl_exec($ch);

// also get the error and response code
$errors = curl_error($ch);
$response = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

$responseData = [
    "response" => $response,
    "result" => json_decode($result),
    "errors" => $errors
];

echo json_encode($responseData);