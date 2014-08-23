<?php
$url =$_SERVER["REQUEST_URI"];
$base = 'http://nodex.mx/';
$host = $_SERVER['HTTP_HOST'];
date_default_timezone_set("America/Mexico_City");
setlocale(LC_MONETARY, 'es_MX');

$hoy=date('Y-m-d');
$ahora=date('H:i:s');

if(!defined('DB_HOST')) define('DB_HOST', 'localhost'); // Database Host Name
if(!defined('DB_USER')) define('DB_USER', 'root'); // Database Username
if(!defined('DB_PASS')) define('DB_PASS', ''); // Database Password
if(!defined('DB_NAME')) define('DB_NAME', 'mydb'); // Database Name


$db = new database(DB_HOST, DB_NAME, DB_USER,DB_PASS);
?>