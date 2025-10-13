<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conexion = mysqli_connect("IP:PUERTO","USER","PASSWORD","ESQUEMA");

if($conexion){
    echo 'Conexión exitosa';
}else{
    echo 'Conexión fallida :(';
}
?>
