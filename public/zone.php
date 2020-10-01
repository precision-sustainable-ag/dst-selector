<?php
if(!isset($_GET['zip'])) die();

if(is_nan($_GET['zip'])) die();


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: application/json');
$file="csv/phm_us_zipcode.csv";

$fh = fopen($file, "r");
$zip = intval($_GET['zip']);

$csvData = array();

while(($row = fgetcsv($fh, 0, ',')) !== FALSE) {

    if($zip == intval($row[0]) && $row[0] !== "zipcode") {

        $csvData['zip'] = (int) $row[0];
        $csvData['zone'] = (int) $row[1];
        break;
    }


}

echo json_encode($csvData);
?>