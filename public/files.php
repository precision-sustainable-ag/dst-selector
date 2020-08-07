<?php 
if(!isset($_GET['dir'])) die();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: application/json');

$baseName = "images/Cover Crop Photos/";

$dirName = $_GET['dir'];
$fullPath = $baseName.$dirName;

if(is_dir($fullPath)){

    $files = glob($fullPath.'/*.[jJ][pP][gG]');
    $res["result"] = "success";

    $res['data'] = $files;

   
    echo json_encode($res);
} else {
    $res['result'] = "error";
    $res["data"] = "Directory does not exist";
    echo json_encode($res);
}

?>