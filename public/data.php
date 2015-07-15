<?
include("in.php");
// echo "<pre>";

$dom = new DOMDocument;
$dom->loadXML($xml);


$books = simplexml_import_dom($dom);

foreach ($books as $flight) {
	// var_dump($flight);

	var_dump($flight['rf_code']);

	$image = "http://www.koltsovo.ru/attels/logo4site/".$flight['rf_code'].".gif";

if (!file_exists("./assets/images/".$flight['rf_code'].".gif")) {
	copy($image, "./assets/images/".$flight['rf_code'].".gif");
}

	echo "<img src='".$image."'>";

	// $f['type'] = 'out';
	// $f['number'] = (string) $flight['rf']."-".(string) $flight['flt'];
	// // $f['number_short'] =(string)  $flight['tws_arrive_eng'];
	// // $f['number'] = (string) $flight['tws_depart'];
	// // $f['number_short'] =(string)  $flight['tws_depart_eng'];
	// $f['company'] = (string) $flight['m2'];
	// // $f['comany_short'] = (string) $flight['m2_eng'];
	// $f['company_alias'] = (string) $flight['rf'];
	// $f['company_icon'] = (string) $flight['rf_code'];
	// $f['aircraft'] = (string) $flight['tws_arrive'];
	// $f['aircraft'] = (string) $flight['tws_depart'];
	// $f['depart_airport'] = 'Екатеринбург';
	// $f['depart_airport_short'] = 'SVX';
	// $f['arrive_airport'] = explode("/", (string) $flight['daname'])[0];
	// $sh = explode("/", (string) $flight['daname'])[1];
	// if ($sh == NULL) {
	// 	$sh = mb_substr($f['arrive_airport'], 0, 3);
	// }
	// $f['arrive_airport_short'] = $sh;
	// $f['time'] = (string) $flight['dp'];
	// $s = explode(";", (string) $flight->route['status']);
	// $f['status'] = (string) $flight['statuzz'];
	// $f['comment'] = (string) $flight['sovm'];

	// $out['items'][] = $f;

}
// echo json_encode($out);

// file_put_contents('data-2.json', json_encode($out));

// echo "</pre>";