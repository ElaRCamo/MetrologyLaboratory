<?php

include_once('connection.php');

$id_tipoEvaluacion = $_GET['id_tipoEvaluacion'];
ContadorTipoPrueba($id_tipoEvaluacion);

function ContadorTipoPrueba($id_tipoEvaluacion){
    $con = new LocalConector();
    $conex = $con->conectar();

    $sqlPrueba =  mysqli_query($conex, "SELECT id_tipoPrueba,descripcionPrueba FROM TipoPrueba WHERE id_tipoEvaluacion='$id_tipoEvaluacion';");

    $resultado= mysqli_fetch_all($sqlPrueba, MYSQLI_ASSOC);
    echo json_encode(array("data" => $resultado));
}

?>