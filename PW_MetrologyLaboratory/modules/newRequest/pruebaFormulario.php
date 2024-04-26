<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="../../imgs/Grammer_Logo.ico" type="image/x-icon">
    <title>Nueva Solicitud</title>

    <!--Enlace de iconos: icons8, licencia con mención -->
    <link rel= "stylesheet" href= "https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css" >
    <!--Fuente -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;700&display=swap" rel="stylesheet">
    <!--Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="../../css/form.css">
    <link rel="stylesheet" href="../../css/style.css">

    <!-- -Archivos de jQuery-->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>

</head>
<body>
<!-- Para agregar material por número de parte-->
<div class=" form-group col-sm-12" id="agregarNumParte" style="display: block">
    <h6>REGISTRO DE MATERIALES | Para agregar otro número de parte, presione
        <button type="button" id="addNumParte"  onclick="llenarCliente(1)">
            <i class="las la-plus-square"></i>
        </button>
    </h6>
</div>
<div id="contenedorFormulario">
<div class="row row-cols-xl-2 clearfix" id="newRow1" style="display: block" >
    <div class="col-xl-8">
        <div class="row">
            <div class="col-sm-6" style="display: block" >
                <div class="form-group" id="div-OEM1" style="display: block" >
                    <div class="help-block with-errors" id="divError1"></div>
                    <select id="cliente1" name="clientes[]" class="form-control"  onchange="llenarPlataforma(1)" required data-error="Por favor ingresa el area solicitante">
                        <option value="">Seleccione el cliente (OEM)*</option>
                    </select>
                    <div class="input-group-icon"><i class="las la-screwdriver"></i></div>
                </div>
            </div>
            <div class="col-sm-6" style="display: block" >
                <div class="form-group" id="plataformaDiv1" style="display: block" >
                    <div class="help-block with-errors"></div>
                    <select id="plataforma1" name="plataformas[]" class="form-control"  onchange="llenarDescMaterial(1)" required data-error="Por favor ingresa la plataforma">
                        <option value="">Seleccione la plataforma*</option>
                    </select>
                    <div class="input-group-icon"><i class="las la-warehouse"></i></div>
                </div>
            </div>
            <div class="col-sm-6" style="display: block" >
                <div class="form-group" id="descripcionMaterial1" style="display: block" >
                    <div class="help-block with-errors"></div>
                    <select id="descMaterial1" name="descripciones[]" class="form-control"  onchange="descripcionMaterial(1); numeroDeParte(1);" required data-error="Por favor ingresa la descripción del material">
                        <option value="">Seleccione la descripción*</option>
                    </select>
                    <div class="input-group-icon"><i class="las la-cog"></i></div>
                </div>
            </div>
            <div class="col-sm-6" style="display: block" >
                <div class="form-group" id="numeroParte1" style="display: block" >
                    <div class="help-block with-errors"></div>
                    <input id="numParte1" name="numPartes[]" type="text" class="form-control" placeholder="Número de parte*" required data-error="Por favor ingresa el número de parte" readonly>
                    <div class="input-group-icon"><i class="las la-cog"></i></div>
                </div>
            </div>
            <div class="col-sm-6" style="display: block" >
                <div class="form-group" id="cantidadMaterial1" style="display: block" >
                    <div class="help-block with-errors"></div>
                    <input id="cdadMaterial1" name="cdadesMaterial[]" type="number" class="form-control"  placeholder="Cantidad*" required data-error="Por favor ingresa la cantidad">
                    <div class="input-group-icon"><i class="las la-cog"></i></div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4 text-center" id="imgMaterial1" style="display: block" >
        <img src="" class="col-md-6 mb-3 ms-md-3 rounded img-fluid img-thumbnail" id="imagenMaterial1" alt="Imagen Material">
    </div>
</div>
</div>
</div>
<div class="form-group last col-sm-12 buttons" style="display: block" >
    <button type="submit" id="submitRequest"  onclick="registrarSolicitud()" class="btn btn-custom" style="display: block"><i class='las la-paper-plane'></i> Enviar</button>
</div><!-- end form-group -->
<script type="text/javascript">
    var i = 1;
    $(document).ready(function() {

        $(document).on('click', '[id^="addNumParte"]', function() {
            i++;

            var newRow = $('<div id="newRow' + i + '" class="row row-cols-xl-3 clearfix">'
                + '<div class="col-xl-8">'
                + '<div class="row">'
                + '<div class="col-sm-6">'
                + '<div class="form-group" id="div-OEM' + i + '">'
                + '<div class="help-block with-errors" id="divError' + i + '"></div>'
                + '<select id="cliente' + i + '" name="clientes[]" class="form-control" onclick="" onchange="llenarPlataforma(' + i + ')" required data-error="Por favor ingresa el area solicitante">'
                + '<option value="">Seleccione el cliente (OEM)*</option>'
                + '</select>'
                + '<div class="input-group-icon"><i class="las la-screwdriver"></i></div>'
                + '</div>'
                + '</div>'
                + '<div class="col-sm-6">'
                + '<div class="form-group" id="plataformaDiv' + i + '">'
                + '<div class="help-block with-errors"></div>'
                + '<select id="plataforma' + i + '" name="plataformas[]" class="form-control" onchange="llenarDescMaterial(' + i + ')" required data-error="Por favor ingresa la plataforma">'
                + '<option value="">Seleccione la plataforma*</option>'
                + '</select>'
                + '<div class="input-group-icon"><i class="las la-warehouse"></i></div>'
                + '</div>'
                + '</div>'
                + '<div class="col-sm-6">'
                + '<div class="form-group" id="descripcionMaterial' + i + '">'
                + '<div class="help-block with-errors"></div>'
                + '<select id="descMaterial' + i + '" name="descripciones[]" class="form-control" onchange="descripcionMaterial(' + i + '); numeroDeParte(' + i + ');" required data-error="Por favor ingresa la descripción del material">'
                + '<option value="">Seleccione la descripción*</option>'
                + '</select>'
                + '<div class="input-group-icon"><i class="las la-cog"></i></div>'
                + '</div>'
                + '</div>'
                + '<div class="col-sm-6">'
                + '<div class="form-group" id="numeroParte' + i + '">'
                + '<div class="help-block with-errors"></div>'
                + '<input id="numParte' + i + '" name="numPartes[]" type="text" class="form-control" placeholder="Número de parte*" required data-error="Por favor ingresa el número de parte" readonly>'
                + '<div class="input-group-icon"><i class="las la-cog"></i></div>'
                + '</div>'
                + '</div>'
                + '<div class="col-sm-6">'
                + '<div class="form-group" id="cantidadMaterial' + i + '">'
                + '<div class="help-block with-errors"></div>'
                + '<input id="cdadMaterial' + i + '" name="cdadesMaterial[]" type="number" class="form-control" placeholder="Cantidad*" required data-error="Por favor ingresa la cantidad">'
                + '<div class="input-group-icon"><i class="las la-cog"></i></div>'
                + '</div>'
                + '</div>'
                + '<div class="col-sm-6">'
                + '<a href="#" class="btn btn-danger remove-lnk" id="' + i + '">Eliminar</a>'
                + '<button type="button" class="btn btn-success" id="addNumParte' + i + '"><i class="las la-plus-square"></i></button>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '<div class="col-xl-4 text-center">'
                + '<div id="imgMaterial' + i + '">'
                + '<img src="" class="col-md-6 mb-3 ms-md-3 rounded img-fluid img-thumbnail" id="imagenMaterial' + i + '" alt="Imagen Material">'
                + '</div>'
                + '</div>'
                + '</div>');


            newRow.appendTo('#contenedorFormulario');
            llenarCliente( i );
            console.log("valor de i:"+i);
        });

        $(document).on('click', '.remove-lnk', function(e) {
            e.preventDefault();
            var id = $(this).attr("id");
            $('#newRow' + id).remove();
        });
    })
</script>
<script src="../../js/general.js"></script>
<script src="../../js/cargarDatos.js"></script>
<script src="../../js/insertarDatos.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
</body>
</html>