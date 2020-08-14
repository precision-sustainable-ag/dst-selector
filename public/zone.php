<?php
if(!isset($_GET['zip'])) die();

if(is_nan($_GET['zip'])) die();


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: application/json');
$file="csv/phm_us_zipcode.csv";
$csv= file_get_contents($file);
$array = array_map("str_getcsv", explode("\n", $csv));
$data = [];

for($i = 1; $i < count($array); $i++) {

    if(intval($array[$i][0]) === intval($_GET['zip'])) {
        $data['zip'] = $array[$i][0];
        $data['zone'] = intval($array[$i][1]);
    }

}
$json = json_encode($data);
print_r($json);


// print_r($dataArray);