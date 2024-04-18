<?php

include_once('connection.php');


    $id_cliente = $_GET["id_cliente"];

    $con = new LocalConector();
    $conex = $con->conectar();

    if (!$conex) {   // Verificar la conexión a la base de datos
        $respuesta = array("success" => false, "message" => "Error al conectar a la base de datos.");
        echo json_encode($respuesta);
        exit;
    }

    $stmt = $conex->prepare("DELETE FROM Cliente WHERE id_cliente = ?");
    $stmt->bind_param("s", $id_cliente);

    if ($stmt->execute()) {
        $respuesta = array("success" => true, "message" => "El registro se eliminó correctamente.");
        echo json_encode($respuesta);
    } else {
        $respuesta = array("success" => false, "message" => "Error al eliminar el registro.");
        echo json_encode($respuesta);
    }
    $stmt->close();
    $conex->close();




?>