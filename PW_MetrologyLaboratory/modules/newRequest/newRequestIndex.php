<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nueva Solicitud</title>

    <!--Enlace de iconos: icons8, licencia con mención -->
    <link rel= "stylesheet" href= "https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css" >
    <!--Fuente -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;700&display=swap" rel="stylesheet">
    <!--Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/contact-form.css">

    <!-- -Archivos de jQuery-->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>

</head>
<body>
    <?php
        # Header section
            require_once('../../header.php');
            require_once('../../navbar.php');

        # Content section
            require_once('contentRequest.php');
        # Content section
    require_once('../../footer.php')
    ?>

    <script>
        // Get the container element
        let listContainer = document.getElementById("menuLateral");

        // Get all buttons with class="btn" inside the container
        let lista = listContainer.getElementsByClassName("optionMenu");

        // Loop through the buttons and add the active class to the current/clicked button
        for (let i = 0; i < lista.length; i++) {
            lista[i].addEventListener("click", function() {
                let current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
    </script>

    <script>
        $(document).ready(function(){
            // Manejar el cambio en el select
            $("#tipoPrueba").change(function(){
                // Ocultar todos los campos
                $("#dimensionalFields, #fullFields, #maquinaUniversalFields").hide();

                // Mostrar el campo correspondiente a la opción seleccionada
                var selectedOption = $(this).val();
                $("#" + selectedOption + "Fields").show();
            });
        });
    </script>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
</body>
</html>

<!-- PLANTILLA
        https://www.youtube.com/watch?v=bvxTewiTHPs&list=PLL9jEdn7PvoT309qO1E_-fLnfhuw2T9kJ&index=8 -->