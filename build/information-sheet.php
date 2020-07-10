<?php
if( ! isset($_GET['crop_id']) ) die('Unknown params.');
$logo1 = "images/neccc_wide_logo_color_web.jpg";
$logo2 = "images/neccc_wide_logo_color_web.webp";

$connection = new MongoClient();
$collection = $connection->main->crops;
$cursor = $collection->find();
foreach ( $cursor as $id => $value )
{
    echo "$id: ";
    var_dump( $value );
}
// $db = new Mongo('mongodb://localhost', array(
//     'db' => 'main'
// ));

// $collection = $db->crops;
// var_dump($collection);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    * {
        font-family: -apple-system, system-ui, BlinkMacSystemFont, 
             'Segoe UI', Roboto, 'Helvetica Neue', 
             Ubuntu, Arial, sans-serif;
    }
    @page {
   size: 7in 9.25in;
   margin: 27mm 16mm 27mm 16mm;
}
header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
    </style>
    <title>Information Sheet</title>
</head>
<body>
    <header>
        <div>
            <img src='<?php echo file_exists($logo1) ? $logo1 : $logo2; ?>' width="250" />
        </div>
        <div><h4>CROP NAME</h4></div>
    </header>
</body>
</html>
