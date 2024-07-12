<?php
include_once('connection.php');

ContadorPruebas();

function ContadorPruebas()
{
    $con = new LocalConector();
    $conex = $con->conectar();

    $anio_actual = date('Y');

    $datos = mysqli_query($conex, "SELECT COUNT(p.id_prueba) AS Pruebas, MONTH(p.fechaRespuesta) AS Mes, descripcionPrueba
                                           FROM Pruebas p JOIN TipoPrueba tp ON p.id_tipoPrueba = tp.id_tipoPrueba
                                          WHERE YEAR(p.fechaRespuesta) = $anio_actual 
                                          GROUP BY MONTH(p.fechaRespuesta), tp.descripcionPrueba 
                                          ORDER BY Mes, descripcionPrueba;");

    $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
    echo json_encode(array("data" => $resultado));
}


?>