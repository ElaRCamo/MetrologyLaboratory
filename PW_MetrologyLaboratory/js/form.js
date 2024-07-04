/***************************************************************************************
 * ***************************************************************************************
 * *********************FUNCIONES DE ESTILOS PARA EL FORMULARIO***************************
 * ***************************************************************************************
 * ***************************************************************************************/
const mostrarBloque = (elemento, mostrar) => {
    elemento.style.display = mostrar ? "block" : "none";
};

function banderaTipoPrueba() {

    const selTipoPrueba = id("tipoPrueba");
    const divSubtipoPrueba = id("divSubtipoPrueba");
    const divNormaNombre = id("normaNombre");
    const divNormaArchivo = id("normaArchivo");
    const divDetallesPrueba = id("detallesPrueba");
    const divTitlePiezas = id("agregarNumParte");
    const divRegistroPiezas = id("newRow1");
    const botonEnviar = id("submitRequest");
    const divCotas = id("divCotas");
    const divImgCotas = id("divImgCotas");
    const divTitlePersonal = id("addPersonalTitle");
    const divAddPersonal = id("newRowPer1");

    let tipoPrueba = selTipoPrueba.value;

    if(tipoPrueba === '1' || tipoPrueba === '2' || tipoPrueba === '6') { // IDL/IFD | SOFTNESS | OTRO
        mostrarBloque(divNormaNombre, true);
        mostrarBloque(divNormaArchivo, true);
        mostrarBloque(divDetallesPrueba, true);
        mostrarBloque(divTitlePiezas, true);
        mostrarBloque(divRegistroPiezas, true);
        mostrarBloque(botonEnviar, true);
        mostrarBloque(divSubtipoPrueba, false);
        mostrarBloque(divCotas, false);
        mostrarBloque(divImgCotas, false);
        mostrarBloque(divTitlePersonal, false);
        mostrarBloque(divAddPersonal, false);

    } else if (tipoPrueba === '3') { // DIMENSIONAL
        mostrarBloque(divSubtipoPrueba, true);
        mostrarBloque(divDetallesPrueba, true);
        mostrarBloque(divTitlePiezas, true);
        mostrarBloque(divRegistroPiezas, true);
        mostrarBloque(botonEnviar, true);
        llenarSubtipoPrueba();
        mostrarBloque(divNormaNombre, false);
        mostrarBloque(divNormaArchivo, false);
        mostrarBloque(divTitlePersonal, false);
        mostrarBloque(divAddPersonal, false);

    } else if(tipoPrueba === '4'){ // COLOR
        mostrarBloque(divDetallesPrueba, true);
        mostrarBloque(divTitlePiezas, true);
        mostrarBloque(divRegistroPiezas, true);
        mostrarBloque(botonEnviar, true);
        mostrarBloque(divNormaNombre, false);
        mostrarBloque(divNormaArchivo, false);
        mostrarBloque(divSubtipoPrueba, false);
        mostrarBloque(divCotas, false);
        mostrarBloque(divImgCotas, false);
        mostrarBloque(divTitlePersonal, false);
        mostrarBloque(divAddPersonal, false);
    }else if(tipoPrueba === '5') { //MUNSELL
        mostrarBloque(divTitlePiezas, false);
        mostrarBloque(divRegistroPiezas, false);
        mostrarBloque(divNormaNombre, false);
        mostrarBloque(divNormaArchivo, false);
        mostrarBloque(divSubtipoPrueba, false);
        mostrarBloque(divCotas, false);
        mostrarBloque(divImgCotas, false);
        mostrarBloque(divDetallesPrueba, true);
        mostrarBloque(divTitlePersonal, true);
        mostrarBloque(divAddPersonal, true);
        mostrarBloque(botonEnviar, true);
    }

    if (esActualizacion === true){
        mostrarBloque(botonEnviar, false);
    }
}

function fsubtipoPrueba(){
    const divCotas = id("divCotas");
    let subtipo= id("subtipoPrueba").value;

    if(subtipo === '2'){ //Dimensional-cotas especificas
        mostrarBloque(divCotas, true);
    }else{
        mostrarBloque(divCotas, false);
    }
}

function previewImageCotas(event) {
    const divImagenCotas = id("divImgCotas");
    let subtipo = id("subtipoPrueba").value;
    if(subtipo === '2'){ //Dimensional-cotas especificas
        mostrarBloque(divImagenCotas, true);
        const reader = new FileReader();
        reader.onload = function() {
            const output = document.getElementById('capturaCotas');
            output.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }else{
        mostrarBloque(divImagenCotas, false);
    }
}
function initTooltips() {
    var tooltipsMod = document.querySelectorAll("[id^='tooltipModelo']");
    var imgModMate = 'https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/imgs/varios/modeloMatematico.png';

    tooltipsMod.forEach(function(tooltip) {
        mostrarImagenTooltip(tooltip, imgModMate, 300,180);
    });

    var tooltipsDibujo = document.querySelectorAll("[id^='tooltipDibujo']");
    var imgRevDib = 'https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/imgs/varios/revDibujo.png';
    tooltipsDibujo.forEach(function(tooltip) {
        mostrarImagenTooltip(tooltip, imgRevDib,250,120);
    });
}

function mostrarImagenTooltip(tooltip, imageUrl, width, height) {
    tippy(tooltip, {
        trigger: 'click',
        animation: 'shift-away',
        theme: 'light',
        onShow(instance) {
            fetch(imageUrl)
                .then((response) => response.blob())
                .then((blob) => {
                    // Convert the blob into a URL
                    const url = URL.createObjectURL(blob);
                    const image = new Image();
                    image.width = width;
                    image.height = height;
                    image.style.display = 'block';
                    image.style.margin = '0 auto'; // Center the image
                    image.src = url;

                    const container = document.createElement('div');
                    container.style.textAlign = 'start'; // Center align text
                    container.style.fontSize = '0.7rem'; // Smaller font size
                    container.appendChild(image);

                    // Update the tippy content with the container
                    instance.setContent(container);
                })
                .catch((error) => {
                    // Fallback if the network request failed
                    instance.setContent(`Request failed. ${error}`);
                });
        },
        arrow: true, // Enable arrow
    });
}


function agregarPieza() {
    indexMaterial++;

    var newRow = $('<div id="newRow' + indexMaterial + '" class="row row-cols-xl-3 clearfix">'
        + '<div class="col-xl-12">'
        + '<div class="row">'
        + '<div class="col-sm-4">'
        + '<div class="" id="div-OEM' + indexMaterial + '">'
        + '<label for="cliente'+ indexMaterial + '">Cliente*</label>'
        + '<div class="form-group" >'
        + '<select id="cliente' + indexMaterial + '" name="cliente'+ indexMaterial + '" class="form-control" onclick="" onchange="llenarPlataforma(' + indexMaterial + ')" required data-error="Por favor ingresa el area solicitante">'
        + '<option value="">Seleccione el cliente</option>'
        + '</select>'
        + '<div class="input-group-icon"><i class="las la-car"></i></div>'
        + '<div class="invalid-feedback"></div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="col-sm-4">'
        + '<div class="" id="plataformaDiv' + indexMaterial + '">'
        + '<label for="plataforma'+ indexMaterial + '">Plataforma*</label>'
        + '<div class="form-group" >'
        + '<select id="plataforma' + indexMaterial + '" name="plataformas'+ indexMaterial + '" class="form-control" required data-error="Por favor ingresa la plataforma">'
        + '<option value="">Seleccione la plataforma*</option>'
        + '</select>'
        + '<div class="input-group-icon"><i class="las la-warehouse"></i></div>'
        + '<div class="invalid-feedback"></div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="col-sm-4">'
        + '<div class="" id="divNumeroParte'+ indexMaterial + '">'
        + '<label for="numeroParte'+ indexMaterial + '">Número de parte*</label>'
        + '<div class="form-group">'
        + '<input id="numeroParte'+ indexMaterial + '" name="numeroParte'+ indexMaterial + '" type="text" class="form-control" placeholder="Número de Parte*" required data-error="Por favor ingresa el número de parte">'
        + '<div class="input-group-icon"><i class="las la-cubes"></i></div>'
        + '<div class="invalid-feedback"></div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="col-sm-4">'
        + '<div class="" id="cantidadMaterial'+ indexMaterial + '">'
        + '<label for="cdadMaterial'+ indexMaterial + '">Cantidad*</label>'
        + '<div class="form-group">'
        + '<input id="cdadMaterial'+ indexMaterial + '" name="cdadMaterial'+ indexMaterial + '" type="number" class="form-control" placeholder="Cantidad*" required data-error="Por favor ingresa la cantidad">'
        + '<div class="input-group-icon"><i class="las la-cubes"></i></div>'
        + '<div class="invalid-feedback"></div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="col-sm-4">'
        + '<div class="" id="divDibujo'+ indexMaterial + '">'
        + '<label for="revDibujo'+ indexMaterial + '">Revisión de dibujo*</label>'
        + '<div class="form-group">'
        + '<input id="revDibujo'+ indexMaterial + '" name="revDibujo'+ indexMaterial + '" type="text" maxlength="3" class="form-control" placeholder="Revisión de dibujo*" required data-error="Por favor ingresa la revisión de dibujo">'
        + '<i class="far fa-question-circle position-absolute" id="tooltipDibujo'+ indexMaterial + '"></i>'
        + '<div class="input-group-icon"><i class="las la-cubes"></i></div>'
        + '<div class="invalid-feedback"></div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="col-sm-4">'
        + '<div class="" id="divModMate'+ indexMaterial + '">'
        + '<label for="modeloMate'+ indexMaterial + '">Mod. matemático*</label>'
        + '<div class="form-group">'
        + '<input id="modeloMate'+ indexMaterial + '" name="modeloMate'+ indexMaterial + '" type="text" maxlength="3" class="form-control" placeholder="Mod. Matemático*" required data-error="Por favor ingresa el modelo matemático">'
        + '<i class="far fa-question-circle position-absolute" id="tooltipModelo'+ indexMaterial + '"></i>'
        + '<div class="input-group-icon"><i class="las la-cubes"></i></div>'
        + '<div class="invalid-feedback"></div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="col-xl-4">'
        + '</div>'
        + '<div class="col-xl-4">'
        + '</div>'
        + '<div class="col-xl-4 buttons-container" id="divButtons' + indexMaterial + '">'
        + '<a href="#" class="remove-lnk removeBtn" id="' + indexMaterial + '"><i class="las la-trash-alt"></i></a>'
        + '<a href="#" class="agregarButton" id="addNumParte' + indexMaterial + '"><i class="las la-plus-square"></i></a>'
        + '</div>'
        + '</div>');
    newRow.appendTo('#contenedorFormulario');
}

/***************************************************************************************
 * ***************************************************************************************
 * *********************FUNCIONES PARA VALIDAR UNA NUEVA SOLICITUD************************
 * ***************************************************************************************
 * ***************************************************************************************/

function validarFormNewRequest() {
    let tipoPrueba = id("tipoPrueba").value;
    const esTipoPruebaValido = validarSelect('tipoPrueba');
    const esSubtipoValido = validarSelect('subtipoPrueba');
    const esInputImgValido = validarInput('imgCotas');
    const esNormaValido = validarInput('norma');
    //const esArchivoValido = validarInput('normaFile');//No es obligatorio
    const esObservacionesValido = validarInput('especificaciones');
    let piezas = validarPiezas();
    let sonTodasPiezasValidas = (
        piezas.esClienteValido && piezas.esPlataformaValida && piezas.esNumParteValido &&
        piezas.esCdadValida && piezas.esrevDibujoValido && piezas.esmodeloMateValido
    );
    let sonPiezasValidasColor = (
        piezas.esClienteValido && piezas.esPlataformaValida && piezas.esNumParteValido && piezas.esCdadValida
    );
    let subtipo= id("subtipoPrueba").value;

    //Validacion dependiendo el tipo de prueba
    if(tipoPrueba === '1' || tipoPrueba === '2' || tipoPrueba === '6') { // IDL/IFD | SOFTNESS | OTRO
        if(esTipoPruebaValido && esNormaValido && esObservacionesValido && sonTodasPiezasValidas){
            initGuardarDatos();
        }
    } else if (tipoPrueba === '3') { // DIMENSIONAL
        if(subtipo === '2'){ //Dimensional-cotas especificas
            if(esTipoPruebaValido && esSubtipoValido && esInputImgValido && sonTodasPiezasValidas){
                initGuardarDatos();
            }
        }else{
            if(esTipoPruebaValido && esObservacionesValido && sonTodasPiezasValidas){
                initGuardarDatos();
            }
        }
    } else if(tipoPrueba === '4'){ // COLOR
        if(esTipoPruebaValido && esObservacionesValido && sonPiezasValidasColor){
            initGuardarDatos();
        }
    /*}else if(tipoPrueba === '5') { //MUNSELL*/
    }else {
        console.log("Hay campos sin completar.");
    }
}

function validarPiezas() {
    let esClienteValido = true;
    let esPlataformaValida = true;
    let esNumParteValido = true;
    let esCdadValida = true;
    let esrevDibujoValido = true;
    let esmodeloMateValido = true;

    for (let i = 1; i <= indexMaterial; i++) {
        esClienteValido = esClienteValido && validarSelect('cliente' + i);
        esPlataformaValida = esPlataformaValida && validarSelect('plataforma' + i);
        esNumParteValido = esNumParteValido && validarInput('numeroParte' + i);
        esCdadValida = esCdadValida && validarInput('cdadMaterial' + i);
        esrevDibujoValido = esrevDibujoValido && validarInput('revDibujo' + i);
        esmodeloMateValido = esmodeloMateValido && validarInput('modeloMate' + i);
    }
    /*console.log("esClienteValido: "+ esClienteValido +"\nesPlataformaValida "+esPlataformaValida);
    console.log("esNumParteValido: "+ esNumParteValido +"\nesCdadValida "+esCdadValida);
    console.log("esrevDibujoValido: "+ esrevDibujoValido +"\nesmodeloMateValido "+esmodeloMateValido);*/

    // Devuelve un objeto con el resultado final de cada validación
    return {
        esClienteValido: esClienteValido,
        esPlataformaValida: esPlataformaValida,
        esNumParteValido: esNumParteValido,
        esCdadValida: esCdadValida,
        esrevDibujoValido: esrevDibujoValido,
        esmodeloMateValido: esmodeloMateValido
    };
}

/***************************************************************************************
 * ***************************************************************************************
 * *********************FUNCIONES PARA GUARDAR UNA NUEVA SOLICITUD************************
 * ***************************************************************************************
 * ***************************************************************************************/

function initGuardarDatos(){
    console.log("esActualizacion: " + esActualizacion);
    if (esActualizacion === false) {
        validacionSolicitud();
    } else if (esActualizacion === true) {
        actualizarSolicitud();
    }
}


function validacionSolicitud() {
    console.log("entrando en validacionSolicitud " );
    const id_pruebaPromise      = obtenerNuevoId(); // Obtener el nuevo ID de forma asíncrona
    const sesionIniciadaPromise = validarSesion(); // Validar la sesión de forma asíncrona

    Promise.all([id_pruebaPromise, sesionIniciadaPromise])
        .then(respuestas => {
            const id_prueba      = respuestas[0];
            const sesionIniciada = respuestas[1];

            if (sesionIniciada && id_prueba !== null && id_prueba !== undefined) {
                //alert("Se ejecuta registrarSolicitud "+id_prueba)
                registrarSolicitud(id_prueba);
            } else if(sesionIniciada === false) {
                // Si la sesión no está iniciada, mostrar un mensaje de error
                Swal.fire("¡La sesión no está iniciada!");
            }
        })
        .catch(error => {
            Swal.fire("¡Error al validar la solicitud!");
        });
}

function obtenerNuevoId() {
    return idPrueba().then(function(nuevoId) {
        console.log("obtenerNuevoId-Nuevo ID:", nuevoId);
        return nuevoId;
    }).catch(function(error) {
        console.error("Error al obtener el nuevo ID:", error);
    });
}
function idPrueba() {
    return new Promise(function(resolve, reject) {
        $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoIdSolicitud.php', function(data) {
            var fecha = new Date();
            var anio = fecha.getFullYear();
            var nuevoId;
            let idMaximo = data.data[0].max_id_prueba;

            if (idMaximo == null) {
                nuevoId = anio + "-0001";
            }else{
                var idMaxPartes = idMaximo.split("-");
                var anioIdMax = parseInt(idMaxPartes[0]); // Convertir a número
                var consecutivoId = idMaxPartes[1];

                if (anioIdMax === anio) {
                    nuevoId = anioIdMax + "-" + (parseInt(consecutivoId) + 1).toString().padStart(4, '0');
                } else {//cambio de año
                    nuevoId = anio + "-0001"; // Asumiendo que el consecutivo inicia en 1
                }
            }
            resolve(nuevoId); // Resolver la promesa con el nuevo ID
        });
    });
}

function validarSesion() {
    return obtenerSesion().then(function(sesionIniciada) {
        console.log("Obterner estatus de la sesión: ", sesionIniciada);
        return sesionIniciada;
    }).catch(function(error) {
        console.error("Error al validar la sesión", error);
    });
}

function obtenerSesion() {
    return new Promise(function(resolve, reject) {
        $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoSesionIniciada.php', function(data) {
            let sesionIniciada = data.sesionIniciada;
            resolve(sesionIniciada); // Resolver la promesa con el nuevo ID
        });
    });
}

function registrarSolicitud(nuevoId) {
    console.log("entrando en registrarSolicitud " );

    const dataForm = new FormData();
    var idNomina           = id("idUsuario");
    var tipoPrueba         = id("tipoPrueba");
    var especificaciones   = id ("especificaciones");
    var fechaSolicitud    = new Date();
    var fechaFormateada  = fechaSolicitud.getFullYear() + '-' + (fechaSolicitud.getMonth() + 1) + '-' + fechaSolicitud.getDate();

    dataForm.append('id_prueba', nuevoId);
    dataForm.append('fechaSolicitud', fechaFormateada);
    dataForm.append('tipoPrueba', tipoPrueba.value.trim());
    dataForm.append('idUsuario', idNomina.value.trim());
    dataForm.append('especificaciones', especificaciones.value.trim());


    if(tipoPrueba === '1' || tipoPrueba === '2' || tipoPrueba === '6') { // IDL/IFD | SOFTNESS | OTRO
        let norma             = id("norma");
        dataForm.append('norma', norma.value.trim());

        let inputArchivo      = id('normaFile');
        // Verificar si hay archivos seleccionados
        if (inputArchivo.files.length > 0) {
            // Hay archivos cargados
            dataForm.append('normaFile', inputArchivo.files[0]);
        } else {
            // No hay archivos cargados
            inputArchivo = "Ningún archivo seleccionado"
            dataForm.append('normaFile', inputArchivo);
        }
    } else if (tipoPrueba === '3') { // DIMENSIONAL
        let subtipo= id("subtipoPrueba");
        if(subtipo.value === '2'){ //Dimensional-cotas especificas
            let imagenCotas = id("imgCotas");
            dataForm.append('imagenCotas', imagenCotas.files[0]);
        }
        dataForm.append('subtipoPrueba', subtipo.value.trim());
    }
    // /*}else if(tipoPrueba === '5') { //MUNSELL*/


    let plataformas = [];
    let numsParte = [];
    let cantidades = [];
    let revDibujos = [];
    let modMatematicos = [];


    for (var k = 1; k <= indexMaterial; k++) {
        // Para agregar material por número de parte
        var plataforma    = id('plataforma' + k);
        var numeroParte       = id('numeroParte' + k);
        var cdadMaterial       = id('cdadMaterial' + k);
        var revDibujo       = id('revDibujo' + k);
        var modeloMate       = id('modeloMate' + k);

        // Añadimos los valores a los arrays correspondientes
        plataformas.push(plataforma.value.trim());
        numsParte.push(numeroParte.value.trim());
        cantidades.push(cdadMaterial.value.trim());
        revDibujos.push(revDibujo.value.trim());
        modMatematicos.push(modeloMate.value.trim());
    }
    // Agregamos los arrays al FormData
    dataForm.append('plataformas', plataformas.join(', '));
    dataForm.append('numsParte', numsParte.join(', '));
    dataForm.append('cantidades', cantidades.join(', '));
    dataForm.append('revDibujos', revDibujos.join(', '));
    dataForm.append('modMatematicos', modMatematicos.join(', '));


    let formDataString = "FormData: \n";
    for (let pair of dataForm.entries()) {
        formDataString += pair[0]+ ', ' + pair[1] + '\n';
    }
    alert(formDataString);

    fetch('../../dao/requestRegister.php', {
        method: 'POST',
        body: dataForm
    })
        .then(function(response) {
            console.log('response.ok: ', response.ok);
            if (response.ok) {
                return response.text().then(showResult);
            } else {
                showError('status code: ' + response.status);
                throw new Error('Error en la solicitud: ' + response.status);
            }
        })
        .then(function(data) {
            resumenSolicitud(nuevoId);
        }).then(function(data) {
            // Si la inserción de datos fue exitosa, llamar a las funciones
            enviarCorreoNuevaSolicitud(nuevoId, solicitante, emailUsuario);
    }).catch(function(error) {
        if (error instanceof TypeError && error.message.includes('Error')) {
            console.error('Error en el procesamiento de datos:', error);
        } else {
            console.error('Error al insertar datos:', error);
        }
    });
}

/***************************************************************************************
 * ***************************************************************************************
 * *******************FUNCIONES PARA CONFIRMAR UNA NUEVA SOLICITUD************************
 * ***************************************************************************************
 * ***************************************************************************************/


function resumenSolicitud(id_prueba) {

    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoSolicitudPrueba.php?id_prueba=' + id_prueba, function (response) {
        var data = response.data[0]; // Aquí ya estás accediendo al primer objeto dentro de 'data'
        let TP = data.id_tipoPrueba;

        // Actualizar el contenido de la ventana modal con los datos obtenidos
        $('#solicitudNumero').text(data.id_prueba);
        $('#fechaSolicitud').text(data.fechaSolicitud);
        $('#solicitante').text(data.nombreSolic);
        $('#tipoPruebaSolicitud').text(data.descripcionPrueba);
        $('#observacionesSolicitud').text(data.especificaciones);
        $('#estatusSolicitud').text(data.descripcionEstatus);
        $('#normaNombreSol').text(data.normaNombre);
        id("archivoNormaSol").href = data.normaArchivo;

        var tabla = document.getElementById("piezasSolicitud");
        var tbody = tabla.getElementsByTagName("tbody")[0];

        // Limpiar contenido previo de la tabla
        tbody.innerHTML = '';

        // Iterar sobre los materiales y crear filas y celdas de tabla
        for (var j = 0; j < response.data.length; j++) {
            var fila = document.createElement("tr");

            var numeroDeParteT = document.createElement("td");
            numeroDeParteT.textContent = response.data[j].numParte;
            fila.appendChild(numeroDeParteT);

            var cdadMaterialesT = document.createElement("td");
            cdadMaterialesT.textContent = response.data[j].cantidad;
            fila.appendChild(cdadMaterialesT);

            var plataformaT = document.createElement("td");
            plataformaT.textContent = response.data[j].descripcionPlataforma;
            fila.appendChild(plataformaT);

            var clienteT = document.createElement("td");
            clienteT .textContent = response.data[j].descripcionCliente;
            fila.appendChild(clienteT );

            var revDibujoT = document.createElement("td");
            revDibujoT .textContent = response.data[j].revisionDibujo;
            fila.appendChild(revDibujoT );

            var modMateT = document.createElement("td");
            modMateT .textContent = response.data[j].ModMatematico;
            fila.appendChild(modMateT );

            tbody.appendChild(fila);
        }
        id_review = id_prueba;
        // Mostrar la ventana modal con id RequestReview
        $('#RequestReview').modal('show');
        mostrarOpciones(TP);
        ocultarContenido("obs",20);
    });

}


/*****************************************
 *************************************************
 * ***************************************************
 * ***************************************************
 * funciones no validadas ---> ****************************
 * ********************************************************
 * ****************************************************
 * *************************************************
 * ********************************************/


function validarPersonal(indexPersonal) {
    let esNominaValido = true;
    let esNombreValida = true;
    let esAreaValida = true;

    for (let i = 1; i <= indexPersonal; i++) {
        esNominaValido = esNominaValido && validarInput('numNomina' + i);
        esNombreValida = esNombreValida && validarInput('nombrePersonal' + i);
        esAreaValida = esAreaValida && validarInput('area' + i);
    }
    console.log("esNominaValido: "+ esNominaValido +"\nesNombreValida "+esNombreValida);
    console.log("esNombreValida: "+ esNombreValida);

    // Devuelve un objeto con el resultado final de cada validación
    return {
        esNominaValido: esNominaValido,
        esNombreValida: esNombreValida,
        esAreaValida: esAreaValida
    };
}

function actualizarTituloH1(id_update) {
    const divh1 = document.querySelector("#divh1");
    const titulo1 = divh1.querySelector("h1");
    const aviso = divh1.querySelector("span");

    if (titulo1) {
        titulo1.textContent = "Actualizar Solicitud " + id_update;
    }
    if (aviso){
        aviso.textContent = " ";
    }
}

function redirectToRequestsIndex() {
    window.location.href = "../requests/requestsIndex.php";
}

function mostrarOpciones(TP){
    const elementosOcultos = document.querySelectorAll('.resumenHidden');
    if (TP!==3 || TP !== 4 || TP !== 5 ) {
        elementosOcultos.forEach(function(elemento) {
            elemento.style.display = 'none';
        });
    }else{
        elementosOcultos.forEach(function(elemento) {
            elemento.style.display = 'block';
        });
    }
}

function showButton(id_button){
    const button = id(id_button);
    button.style.display = "inline-block";
}

function hideButton(id_button){
    const button = id(id_button);
    button.style.display = "none";
}