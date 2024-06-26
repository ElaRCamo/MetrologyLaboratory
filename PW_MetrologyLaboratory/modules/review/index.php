<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="../../imgs/Grammer_Logo.ico" type="image/x-icon">
    <title>Consultar una prueba</title>

    <!--Enlace de iconos: icons8, licencia con mención -->
    <link rel= "stylesheet" href= "https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css" >
    <!--Fuente -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;700&display=swap" rel="stylesheet">
    <!--Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="../../css/style.css">
    <!-- -Archivos de jQuery-->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <?php
        session_start();
            $nombreUser = $_SESSION['nombreUsuario'];
            $tipoUser = $_SESSION['tipoUsuario'];
            $idUsuario = $_SESSION['nomina'];
            $fotoUsuario = $_SESSION['fotoUsuario'];
        if ($tipoUser == null){
            header("Location: https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/modules/sesion/indexSesion.php");
        }
        ?>
</head>
<body >
<?php
    # Header section
    require_once('../../header.php');
    require_once('../../navbar.php');

    # Content section
    require_once('contentReview.php');
    # Content section
    require_once('../../footer.php');
    # Ventanas modales
            include 'modalResultados.php';
    ?>
<script>
    let id_review;
    let id_user = <?php echo json_encode($_SESSION['nomina']); ?>;
    let tipoUser = <?php echo json_encode($_SESSION['tipoUsuario']); ?>;

    document.addEventListener("DOMContentLoaded", function() {
        // Obtener el valor de id_prueba de la URL
        var urlParams = new URLSearchParams(window.location.search);

        id_review = urlParams.get('id_prueba');

        // Llamar a la función resumenPrueba con el id_prueba obtenido
        if (id_review) {
            resumenPrueba(id_review);
             var titulo = document.querySelector("h1");
            if (titulo) {
                titulo.textContent = "Resumen de Solicitud " + id_review;
            }

        }
    });
    function actualizarTitulo() {
        var titulo5 = document.querySelector("#modalResultados h5");
        if (titulo5) {
            titulo5.textContent = "Responder Solicitud " + id_review;
        }
    }

    function updatePrueba(){
        <?php if ($tipoUser== 3){ ?>
            //Solo se puede actualizar si esta en espera de aprobación o en estatus rechazado
            window.location.href = "../newRequest/newRequestIndex.php?id_update="+ id_review;

        <?php
        } else if($tipoUser== 1 || $tipoUser== 2){?>
            //Se cargan los valores que ya se definieron
            llenarEstatusPrueba();
            llenarPrioridadPrueba();
            consultarMetrologos();
            document.getElementById("observacionesAdmin").value = obs_Solicitud;
            llenarResultados();
        <?php } ?>
    }
    function llenarResultados(){
        const inputResultadosGuardados = document.getElementById('resultadosGuardados');
        const btnResultados = document.getElementById('btnCambiarResultados');
        const divResultados = document.getElementById('divCambiarResultados');
        let enlaceResultados = document.getElementById('resultadosGuardados');

        if (resultadosSol === null || resultadosSol === '') {
            inputResultadosGuardados.style.display = 'none';
            btnResultados.style.display = 'none';
        }else {
            let esUrl = esURL(resultadosSol);
            if (esUrl) {
                enlaceResultados.href = resultadosSol;
                enlaceResultados.textContent = `${resultadosSol}`;
            } else {
                enlaceResultados.removeAttribute('href');  // Remueve el href para que no sea un enlace
                enlaceResultados.textContent = `${resultadosSol}`;
            }
            divResultados.style.display = 'none';
        }
    }

    function esURL(cadena) {
        let urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;  // Expresión regular para verificar si resultadosSol es una URL
        let esUrl;
        esUrl = urlRegex.test(cadena);
        return esUrl;
    }

    function checkedInput() {
        const rutaRadio = document.getElementById('rutaRadio');
        const archivoRadio = document.getElementById('archivoRadio');
        const divResultados = document.getElementById('divCambiarResultados');
        let esUrl = esURL(resultadosSol);

        divResultados.style.display = 'block';

        if (esUrl) { // Es una url
            archivoRadio.checked = true;
        } else { // Es una ruta local
            rutaRadio.checked = true;
        }
    }

    function cambiarResultado(){
        const divResultados = document.getElementById('divResultados');
        const selectEstatus = document.getElementById('estatusPruebaAdmin');

        if (selectEstatus.value === '4') {
            divResultados.style.display = 'block';
            selectInputResultado();
        } else {
            divResultados.style.display = 'none';
        }
    }

    function selectInputResultado() {
        const rutaRadio = document.getElementById('rutaRadio');
        const archivoRadio = document.getElementById('archivoRadio');
        const resultadosAdminRuta = document.getElementById('resultadosAdminRuta');
        const resultadosAdminArchivo = document.getElementById('resultadosAdminArchivo');

        if (rutaRadio.checked) {
            resultadosAdminRuta.style.display = 'block';
            resultadosAdminArchivo.style.display = 'none';
        } else if (archivoRadio.checked) {
            resultadosAdminRuta.style.display = 'none';
            resultadosAdminArchivo.style.display = 'block';
        }
    }

    function fechaCompromiso(){
        const selectEstatus = document.getElementById('estatusPruebaAdmin');
        const divFechaCompromiso = document.getElementById('divFechaCompromiso');
        const inputFechaCompromiso = document.getElementById('iFechaCompromiso');
        //fecha de hoy en formato YYYY-MM-DD
        var hoy = new Date().toISOString().split('T')[0];

        if (selectEstatus.value === '2') { //Estatus aprobado
            divFechaCompromiso.style.display = 'block';
            inputFechaCompromiso.setAttribute('min', hoy);
        } else if (selectEstatus.value === '1' || selectEstatus.value === '3' || selectEstatus.value === '4' || selectEstatus.value === '5' || selectEstatus.value === '6'){
            divFechaCompromiso.style.display = 'none';
        }

    }

    // Event listener for modal shown event
    document.addEventListener('DOMContentLoaded', function() {
        $('#modalResultados').on('shown.bs.modal', function () {
            const selectEstatus = document.getElementById('estatusPruebaAdmin');

            // Initial call to cambiarResultado to set initial state
            cambiarResultado();

            // Event listener for selectEstatus change
            selectEstatus.addEventListener('change', cambiarResultado);
        });
    });
</script>
<script src="../../js/general.js"></script>
<script src="../../js/cargarDatos.js"></script>
<script src="../../js/actualizarDatos.js"></script>
<script src="../../js/insertarDatos.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
</body>
</html>