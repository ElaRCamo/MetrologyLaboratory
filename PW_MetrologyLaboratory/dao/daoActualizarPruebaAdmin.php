<?php

include_once('connection.php');
require_once('funcionesRequest.php');

if($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_POST['id_prueba'], $_POST['estatusPruebaAdmin'], $_POST['prioridadPruebaAdmin'], $_POST['metrologoAdmin'], $_POST['observacionesAdmin'])) {
        $id_prueba = $_POST['id_prueba'];
        $id_estatus = $_POST['estatusPruebaAdmin'];
        $id_prioridad = $_POST['prioridadPruebaAdmin'];
        $id_metrologo = $_POST['metrologoAdmin'];
        $observaciones = $_POST['observacionesAdmin'];
        $id_admin = $_POST['id_user'];
        $tipoPrueba = $_POST['tipoPrueba'];

        //Se agrega fecha compromiso:
        $fechaCompromisoBD = consultarFechaCompromiso($id_prueba); //fecha guardada en la BD

        if ($fechaCompromisoBD === '0000-00-00') {//Si no hay fecha asignada, se actualiza
            $fechaCompromiso = $_POST['fechaCompromiso'] ?? '0000-00-00';
        } else {
            $fechaCompromiso = $fechaCompromisoBD;//Se queda igual
        }



        // Obtener los reportes(resultado de cada prueba) como una cadena separada por comas
        $reportesProcesados = [];

        // Verifica si 'reportes' está en $_FILES
        if (isset($_POST['reportes']) || isset($_FILES['reportes'])) {
            foreach ($_FILES['reportes']['name'] as $index => $nombreArchivo) {
                echo "1-if: ";
                // Verifica si hay un archivo en $_FILES
                if ($_FILES['reportes']['error'][$index] === UPLOAD_ERR_NO_FILE) {
                    // No hay archivo, verifica en $_POST
                    if (isset($_POST['reportes'][$index])) {
                        $reporte = $_POST['reportes'][$index];
                        echo "2-reporte post: ".$reporte;
                        if ($reporte === "Sin resultados") {
                            $reportesProcesados[] = "Sin resultados";
                            echo "3-reporte Sin resultados: ".$reporte;
                        } else {
                            $reportesProcesados[] = $reporte;
                            echo "4-reportesProcesados[] : ".$reporte;
                        }

                    }
                } else {
                    echo "5-else: ";
                    // Procesa el archivo
                    if ($_FILES['reportes']['error'][$index] > 0) {
                        $archivo = array("error" => "Error: " . $_FILES['reportes']['error'][$index]);
                    } else {
                        $target_dir = "https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/files/results/";
                        $archivoFileName = $id_prueba . "-" . str_replace(' ', '-', $nombreArchivo);
                        $archivoFile = $target_dir . $archivoFileName;
                        $moverNormaFile = "../files/results/" . $archivoFileName;

                        if (move_uploaded_file($_FILES['reportes']['tmp_name'][$index], $moverNormaFile)) {
                            $archivo = $archivoFile;
                        } else {
                            $archivo = array("error" => "Hubo un error al mover el archivo.");
                        }
                    }
                    $reportesProcesados[] = $archivo;
                    echo "6-archivo : ".$archivo;
                }
            }
        }


        echo '<pre>';
        print_r($reportesProcesados);
        echo '</pre>';

















        if($tipoPrueba === '5'){ //Prueba Munsell
            if(isset($_POST['nominas'])){
                $nominas = array_map('trim', explode(',', $_POST['nominas']));
            }else{
                $nominas = "No aplica";
            }
            //$response = actualizarPruebaMunsell($id_prueba,$id_estatus,$id_prioridad, $id_metrologo, $observaciones,$fechaCompromiso,$id_admin,$tipoPrueba, $nominas, $reportesProcesados);
            $response = array("status" => 'sucess', "message" => "Se ejecuta funcion actualizarPruebaMunsell");
        }else{
            if(isset($_POST['estatuss'], $_POST['piezas'])){
                $numsParte = array_map('trim', explode(',', $_POST['piezas']));
                $estatusPiezas = array_map('trim', explode(',', $_POST['estatuss']));
            }else{
                $numsParte = "No aplica";
                $estatusPiezas = "No aplica";
            }
            $response = actualizarPrueba($id_prueba,$id_estatus,$id_prioridad, $id_metrologo, $observaciones,$fechaCompromiso,$id_admin,$tipoPrueba,$numsParte,$estatusPiezas,$reportesProcesados);
            //$response = array("status" => 'sucess', "message" => "Se ejecuta funcion actualizarPrueba");
        }
    }else{
        $response = array("status" => 'error', "message" => "Faltan datos en el formulario.");
    }
} else {
    $response = array("status" => 'error', "message" => "Se esperaba REQUEST_METHOD");
}
echo json_encode($response);


function consultarFechaCompromiso($id_prueba) {
    $con = new LocalConector();
    $conex = $con->conectar();

    $query = "SELECT fechaCompromiso FROM Pruebas WHERE id_prueba = '$id_prueba';";
    $result = mysqli_query($conex, $query);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        return $row['fechaCompromiso'];
    } else {
        return null;
    }
}
function subirArchivo($target_dir, $id_prueba, $input_name) {
    $archivo = '';

    // Verificar si el archivo fue subido sin errores
    if ($_FILES[$input_name]["error"] > 0) {
        $archivo = array("error" => "Error: " . $_FILES[$input_name]["error"]);
    } else {
        // Quitar espacios del nombre del archivo
        $nombreArchivo = $_FILES[$input_name]["name"];
        $archivoFileName = $id_prueba . "-" . str_replace(' ', '-', $nombreArchivo);
        $archivoFile = $target_dir . $archivoFileName;
        $moverNormaFile = "../files/results/" . $archivoFileName;

        // Mover el archivo cargado a la ubicación deseada
        if (move_uploaded_file($_FILES[$input_name]["tmp_name"], $moverNormaFile)) {
            $archivo = $archivoFile;
        } else {
            $archivo = array("error" => "Hubo un error al mover el archivo.");
        }
    }
    return $archivo;
}


// Función para determinar si el reporte es un archivo
function esArchivo($reporte): bool
{
    return (preg_match('/\.(pdf)$/i', $reporte) === 1);
}

function actualizarPrueba($id_prueba, $id_estatus, $id_prioridad, $id_metrologo, $observaciones, $fechaCompromiso, $id_admin, $tipoPrueba, $numsParte, $estatusPiezas, $reportes) {
    $con = new LocalConector();
    $conex = $con->conectar();

    // Iniciar transacción
    $conex->begin_transaction();

    // Actualizar TablaPruebas
    $response = actualizarPruebas($conex, $id_prueba, $id_estatus, $id_prioridad, $id_metrologo, $observaciones, $fechaCompromiso);
    $stringNumParte = "";
    $stringEstatus = "";
    $stringReportes = "";
    $rGuardarPiezas = true;

    if ($response["status"] === "success") {
        //echo json_encode($response);
        // Verifica que los arrays tengan la misma longitud
        if (count($numsParte) === count($estatusPiezas)) {
            for ($i = 0; $i < count($estatusPiezas); $i++) {
                $numParte = $numsParte[$i];
                $estatusPieza = $estatusPiezas[$i];
                $reporte = $reportes[$i];

                // Concatenar valores a las variables string
                $stringNumParte .= $numParte . ', ';
                $stringEstatus .= $estatusPieza . ', ';
                $stringReportes .= $reporte . ', ';

                // Imprimir cada par de valores
                //echo "numParte: $numParte, estatusPieza: $estatusPieza, reporte: $reporte\n";

                // Preparar y ejecutar la consulta
                $updateMaterial = $conex->prepare("UPDATE Piezas
                                                   SET id_estatus = ?, reportePieza = ?, fechaReporte = NOW()
                                                   WHERE numParte = ? AND id_prueba = ?");
                $updateMaterial->bind_param("issi", $estatusPieza, $reporte, $numParte, $id_prueba);
                $rGuardarPiezas = $rGuardarPiezas && $updateMaterial->execute();
            }

            // Eliminar la última coma y espacio de las cadenas concatenadas
            $stringNumParte = rtrim($stringNumParte, ', ');
            $stringEstatus = rtrim($stringEstatus, ', ');
            $stringReportes = rtrim($stringReportes, ', ');

        } else {
            echo "Los arrays numsParte y estatusPiezas no tienen la misma longitud.";
        }
    }

    // Descripción de la bitácora
    $descripcion = "Admin actualiza la solicitud. Valores: "
        . "id_estatus = " . $id_estatus . ", "
        . "id_prioridad = " . $id_prioridad . ", "
        . "id_metrologo = " . $id_metrologo . ", "
        . "observaciones = " . $observaciones . ", "
        . "PiezasNumParte = " . $stringNumParte . ", "
        . "PiezasEstatus = " . $stringEstatus . ", "
        . "Reportes = " . $stringReportes . ", "
        . "fechaCompromiso = " . $fechaCompromiso;

    $responseBitacora = registrarCambioBitacoora($conex, $id_prueba, $descripcion, $id_admin);

    if ($responseBitacora["status"] === "success" && $rGuardarPiezas === true) {
        $conex->commit();
        $response = array("status" => "success", "message" => "Prueba actualizada");
    } else {
        $conex->rollback();
        $response = array("status" => 'error', "message" => "Error.");
        if ($responseBitacora["status"] !== "success") {
            $response = $responseBitacora;
        }
    }

    $conex->close();
    return $response;
}

function actualizarPruebas($conexPruebas, $id_prueba, $id_estatus, $id_prioridad, $id_metrologo, $observaciones, $fechaCompromiso)
{

    $rUpdateQuery = true;
    if ($fechaCompromiso !== '0000-00-00' && $id_estatus === '2') { // Estatus aprobado y sin fecha registrada
        $updateQuery = $conexPruebas->prepare("UPDATE Pruebas
                                           SET id_estatusPrueba = ?, id_prioridad = ?, id_metrologo = ?, especificacionesLab = ?, fechaCompromiso = ?
                                         WHERE id_prueba = ?");
        $updateQuery->bind_param("iissss", $id_estatus, $id_prioridad, $id_metrologo, $observaciones, $fechaCompromiso, $id_prueba);

    } else {
        $updateQuery = $conexPruebas->prepare("UPDATE Pruebas
                                           SET id_estatusPrueba = ?, id_prioridad = ?, id_metrologo = ?, especificacionesLab = ?
                                         WHERE id_prueba = ?");
        $updateQuery->bind_param("iisss", $id_estatus, $id_prioridad, $id_metrologo, $observaciones, $id_prueba);
    }

    $rUpdateQuery = $rUpdateQuery && $updateQuery->execute();

    if ($rUpdateQuery) {
        $response = array('status' => 'success', 'message' => 'Datos guardados correctamente');
    } else {
        $response = array('status' => 'error', 'message' => 'Error al actualizar tabla Pruebas');
    }

    return $response;
}
?>