<?php

include_once('connection.php');

$id_descripcion = $_GET['id_descripcion'];
CargarImagen($id_descripcion);

function CargarImagen($id_descripcion){
    $con = new LocalConector();
    $conex = $con->conectar();

    $datos = mysqli_query($conex, "SELECT imgMaterial FROM `DescripcionMaterial` WHERE id_descripcion='$id_descripcion';");

    $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
    echo '<script>alert("' . $datos . '");</script>';
    echo json_encode(array("data" => $resultado));
}

?>
