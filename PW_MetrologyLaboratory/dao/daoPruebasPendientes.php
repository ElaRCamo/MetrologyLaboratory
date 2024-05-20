<?php

include_once('connection.php');

PruebasPendientes();
function PruebasPendientes(){
    $con = new LocalConector();
    $conex = $con->conectar();

    $datos = mysqli_query($conex, "SELECT COUNT(*)
                                          FROM Prueba
                                         WHERE id_estatusPrueba = 1
                                            OR id_estatusPrueba = 2;");

    $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
    echo json_encode(array("data" => $resultado));
}
?>