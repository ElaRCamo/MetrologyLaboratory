function llenarEvaluacion(){
    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoTipoEvaluacion.php', function (data){
        var selectS = id("tipoEvaluacion");

        for (var i = 0; i < data.data.length; i++) {
            var createOption = document.createElement("option");
            createOption.value = data.data[i].id_tipoEvaluacion;
            createOption.text = data.data[i].descripcionEvaluacion;
            selectS.appendChild(createOption);
        }
    });
}

function llenarTipoPrueba() {
    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoTipoPrueba.php?id_tipoEvaluacion=' + id("tipoEvaluacion").value, function (data) {
        var selectS = id("tipoPrueba");
        selectS.innerHTML = ""; //limpiar contenido

        var createOptionDef = document.createElement("option");
        createOptionDef.text = "Seleccione el tipo de prueba*";
        createOptionDef.value = "";
        selectS.appendChild(createOptionDef);

        for (var i = 0; i < data.data.length; i++) {
            var createOptionS = document.createElement("option");
            createOptionS.value = data.data[i].id_tipoPrueba;
            createOptionS.text = data.data[i].descripcionPrueba;
            selectS.appendChild(createOptionS);
        }
    });
}
function llenarPruebaEspecial(){
    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoTipoPruebaEspecial.php', function (data){
        var selectS = id("tipoPruebaEspecial");
        selectS.innerHTML = ""; //limpiar contenido

        var createOptionDef = document.createElement("option");
        createOptionDef.text = "Especifique el tipo de prueba*";
        createOptionDef.value = "";
        selectS.appendChild(createOptionDef);

        for (var i = 0; i < data.data.length; i++) {
            var createOption = document.createElement("option");
            createOption.value = data.data[i].id_pruebaEspecial;
            createOption.text = data.data[i].descripcionEspecial;
            selectS.appendChild(createOption);
        }
    });
}

function llenarCliente(i){
    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoCliente.php', function (data){
        var selectS = id("cliente" + i);
        selectS.innerHTML = ""; //limpiar contenido

        var createOptionDef = document.createElement("option");
        createOptionDef.text = "Especifique el cliente(OEM)*";
        createOptionDef.value = "";
        selectS.appendChild(createOptionDef);

        for (var j = 0; j < data.data.length; j++) {
            var createOption = document.createElement("option");
            createOption.value = data.data[j].id_cliente;
            createOption.text = data.data[j].descripcionCliente;
            selectS.appendChild(createOption);
        }
    });
}

function clienteModal(){
    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoCliente.php', function (data){
        var selectS = id("descPClienteN");
        selectS.innerHTML = "";

        var createOptionDef = document.createElement("option");
        createOptionDef.text = "Especifique el cliente*";
        createOptionDef.value = "";
        selectS.appendChild(createOptionDef);

        for (var j = 0; j < data.data.length; j++) {
            var createOption = document.createElement("option");
            createOption.value = data.data[j].id_cliente;
            createOption.text = data.data[j].descripcionCliente;
            selectS.appendChild(createOption);
        }
    });
}

function llenarPlataforma(i) {
    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoPlataforma.php?id_cliente=' + id("cliente" + i).value, function (data) {
        var selectS = id("plataforma"+ i);7
        selectS.innerHTML = ""; //limpiar contenido

        var createOptionDef = document.createElement("option");
        createOptionDef.text = "Seleccione la plataforma*";
        createOptionDef.value = "";
        selectS.appendChild(createOptionDef);

        for (var j = 0; j < data.data.length; j++) {
            var createOptionS = document.createElement("option");
            createOptionS.value = data.data[j].id_plataforma;
            createOptionS.text = data.data[j].descripcionPlataforma;
            selectS.appendChild(createOptionS);
        }
    });
}
function plataformaModal(){
    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoPlataformasT.php', function (data){
        var selectS = id("descMPlataformaN");
        selectS.innerHTML = "";

        var createOptionDef = document.createElement("option");
        createOptionDef.text = "Especifique la plataforma*";
        createOptionDef.value = "";
        selectS.appendChild(createOptionDef);

        for (var j = 0; j < data.data.length; j++) {
            var createOption = document.createElement("option");
            createOption.value = data.data[j].id_plataforma;
            createOption.text = data.data[j].descripcionPlataforma;
            selectS.appendChild(createOption);
        }
    });
}

function llenarDescMaterial(i) {
    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoDescMaterial.php?id_plataforma=' + id("plataforma" + i).value, function (data) {
        var selectS = id("descMaterial"+ i);
        selectS.innerHTML = "";

        var createOptionDef = document.createElement("option");
        createOptionDef.text = "Seleccione la descripcion*";
        createOptionDef.value = "";
        selectS.appendChild(createOptionDef);

        for (var j = 0; j < data.data.length; j++) {
            var createOptionS = document.createElement("option");
            createOptionS.value = data.data[j].id_descripcion;
            createOptionS.text = data.data[j].descripcionMaterial;
            selectS.appendChild(createOptionS);
        }
    });
}

function numeroDeParte(i){
    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoNumParte.php?id_descripcion=' + id("descMaterial" + i).value, function (data) {
        var inputId = id("numParte"+ i);
        inputId.value = "#Parte: " + data.data[0].numeroDeParte;
    });
}


function descripcionMaterial(i){
    var divImgMaterial     = id("imgMaterial" + i);
    var cbDescMaterial     = id("descMaterial" + i);
    if (cbDescMaterial.value != null){
        divImgMaterial.style.display = "block";
        $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoImgMaterial.php?id_descripcion=' + id("descMaterial" + i).value, function (data) {
            id("imagenMaterial"+ i).src = data.data[0].imgMaterial;
        });
    }else{
        divImgMaterial.style.display = "none";
    }
}

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

        var tabla = document.getElementById("materialesSolicitud");
        var tbody = tabla.getElementsByTagName("tbody")[0];

        // Limpiar contenido previo de la tabla
        tbody.innerHTML = '';

        // Iterar sobre los materiales y crear filas y celdas de tabla
        for (var j = 0; j < response.data.length; j++) {
            var fila = document.createElement("tr");

            var numeroDeParteT = document.createElement("td");
            numeroDeParteT.textContent = response.data[j].numeroDeParte;
            fila.appendChild(numeroDeParteT);

            var descMaterialesT = document.createElement("td");
            descMaterialesT.textContent = response.data[j].descripcionMaterial;
            fila.appendChild(descMaterialesT);

            var cdadMaterialesT = document.createElement("td");
            cdadMaterialesT.textContent = response.data[j].cantidad;
            fila.appendChild(cdadMaterialesT);

            tbody.appendChild(fila);
        }
        id_review = id_prueba;
        // Mostrar la ventana modal con id RequestReview
        $('#RequestReview').modal('show');
        mostrarOpciones(TP);
        ocultarContenido("obs",20);
    });

}

function TablaPruebasSolicitante(id_solicitante) {

    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoConsultaPruebasSolicitante.php?id_solicitante=' + id_solicitante, function (response) {
        var tabla = id("listadoPruebas");
        var tbody = tabla.getElementsByTagName("tbody")[0];

        // Limpiar contenido previo de la tabla
        tbody.innerHTML = '';

        // Iterar sobre los materiales y crear filas y celdas de tabla
        for (var j = 0; j < response.data.length; j++) {
            var fila = document.createElement("tr");

            var id_pruebaL = document.createElement("td");
            id_pruebaL.textContent = response.data[j].id_prueba;
            id_pruebaL.setAttribute("onclick", "reviewPage('" + id_pruebaL.textContent + "')");
            id_pruebaL.classList.add("idEnlace");
            fila.appendChild(id_pruebaL);


            var fechaSolicitudL = document.createElement("td");
            fechaSolicitudL.textContent = response.data[j].fechaSolicitud;
            fila.appendChild(fechaSolicitudL);

            var fechaRespuestaL = document.createElement("td");
            fechaRespuestaL.textContent = response.data[j].fechaRespuesta;
            fila.appendChild(fechaRespuestaL);

            var descripcionEstatusL = document.createElement("td");
            descripcionEstatusL.textContent = response.data[j].descripcionEstatus;
            fila.appendChild(descripcionEstatusL);

            var descripcionPruebaL = document.createElement("td");
            descripcionPruebaL.textContent = response.data[j].descripcionPrueba;
            fila.appendChild(descripcionPruebaL);

            var descripcionPrioridadL = document.createElement("td");
            descripcionPrioridadL.textContent = response.data[j].descripcionPrioridad;
            fila.appendChild(descripcionPrioridadL);

            var nombreSolicL = document.createElement("td");
            nombreSolicL.textContent = response.data[j].nombreSolic;
            fila.appendChild(nombreSolicL);

            var nombreMetroL = document.createElement("td");
            nombreMetroL.textContent = response.data[j].nombreMetro;
            fila.appendChild(nombreMetroL);

            var especificacionesL = document.createElement("td");
            especificacionesL.textContent = response.data[j].especificaciones;
            especificacionesL.classList.add("textVerMas");
            fila.appendChild(especificacionesL);
            tbody.appendChild(fila);
        }
        ocultarContenido("textVerMas",40);
    });
}

function TablaPruebasAdmin() {

    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoConsultaPruebasAdmin.php', function (response) {
        var tabla = id("listadoPruebas");
        var tbody = tabla.getElementsByTagName("tbody")[0];

        // Limpiar contenido previo de la tabla
        tbody.innerHTML = '';

        // Iterar sobre los materiales y crear filas y celdas de tabla
        for (var j = 0; j < response.data.length; j++) {
            var fila = document.createElement("tr");

            var id_pruebaL = document.createElement("td");
            id_pruebaL.textContent = response.data[j].id_prueba;
            id_pruebaL.setAttribute("onclick", "reviewPage('" + id_pruebaL.textContent + "')");
            id_pruebaL.classList.add("idEnlace");
            fila.appendChild(id_pruebaL);


            var fechaSolicitudL = document.createElement("td");
            fechaSolicitudL.textContent = response.data[j].fechaSolicitud;
            fila.appendChild(fechaSolicitudL);

            var fechaRespuestaL = document.createElement("td");
            fechaRespuestaL.textContent = response.data[j].fechaRespuesta;
            fila.appendChild(fechaRespuestaL);

            var descripcionEstatusL = document.createElement("td");
            descripcionEstatusL.textContent = response.data[j].descripcionEstatus;
            fila.appendChild(descripcionEstatusL);

            var descripcionPruebaL = document.createElement("td");
            descripcionPruebaL.textContent = response.data[j].descripcionPrueba;
            fila.appendChild(descripcionPruebaL);

            var descripcionPrioridadL = document.createElement("td");
            descripcionPrioridadL.textContent = response.data[j].descripcionPrioridad;
            fila.appendChild(descripcionPrioridadL);

            var nombreSolicL = document.createElement("td");
            nombreSolicL.textContent = response.data[j].nombreSolic;
            fila.appendChild(nombreSolicL);

            var nombreMetroL = document.createElement("td");
            nombreMetroL.textContent = response.data[j].nombreMetro;
            fila.appendChild(nombreMetroL);

            var especificacionesL = document.createElement("td");
            especificacionesL.textContent = response.data[j].especificaciones;
            especificacionesL.classList.add("textVerMas");
            fila.appendChild(especificacionesL);
            tbody.appendChild(fila);
        }
        ocultarContenido("textVerMas",40);
    });
}

function reviewPage(ID_PRUEBA){

    window.location.href = "https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/modules/review/index.php?id_prueba=" + ID_PRUEBA;
}

function resumenPrueba(ID_PRUEBA){


    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoResumenPrueba.php?id_prueba=' + ID_PRUEBA, function (response) {
       //codigo para actualizar campos
        var data = response.data[0]; // Aquí ya estás accediendo al primer objeto dentro de 'data'
        let TP = data.id_tipoPrueba;
        $('#numeroPruebaR').text(data.id_prueba);
        $('#fechaSolicitudR').text(data.fechaSolicitud);
        $('#fechaRespuestaR').text(data.fechaRespuesta);
        $('#solicitanteR').text(data.nombreSolic);
        $('#metrologoR').text(data.nombreMetro);
        $('#tipoPruebaSolicitudR').text(data.descripcionPrueba);
        $('#observacionesSolR').text(data.especificaciones);
        $('#estatusSolicitudR').text(data.descripcionEstatus);
        $('#prioridadR').text(data.descripcionPrioridad);
        $('#normaNombreR').text(data.normaNombre);
        id("archivoNormaR").href = data.normaArchivo;
        $('#observacionesLabR').text(data.especificacionesLab);
        $('#rutaResultadosR').text(data.rutaResultados);


        var tabla = document.getElementById("materialesResumen");
        var tbody = tabla.getElementsByTagName("tbody")[0];

        // Limpiar contenido previo de la tabla
        tbody.innerHTML = '';

        // Iterar sobre los materiales y crear filas y celdas de tabla
        for (var j = 0; j < response.data.length; j++) {
            var fila = document.createElement("tr");

            var numeroDeParteT = document.createElement("td");
            numeroDeParteT.textContent = response.data[j].numeroDeParte;
            fila.appendChild(numeroDeParteT);

            var descMaterialesT = document.createElement("td");
            descMaterialesT.textContent = response.data[j].descripcionMaterial;
            fila.appendChild(descMaterialesT);

            var cdadMaterialesT = document.createElement("td");
            cdadMaterialesT.textContent = response.data[j].cantidad;
            fila.appendChild(cdadMaterialesT);

            tbody.appendChild(fila);
        }
    });

}

function reviewPDF(ID_PRUEBA){
    window.location.href = "https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/modules/review/pruebaPDF.php?id_prueba=" + ID_PRUEBA;
}

function TablaAdminClientes(){
    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoCliente.php', function (response) {
        var tabla = id("tablaClientes");
        var tbody = tabla.getElementsByTagName("tbody")[0];

        // Limpiar contenido previo de la tabla
        tbody.innerHTML = '';

        // Iterar sobre los materiales y crear filas y celdas de tabla
        for (var j = 0; j < response.data.length; j++) {
            var fila = document.createElement("tr");

            var idCliente = document.createElement("td");
            idCliente.textContent = response.data[j].id_cliente;
            fila.appendChild(idCliente);

            var descripcionCliente = document.createElement("td");
            descripcionCliente.textContent = response.data[j].descripcionCliente;
            fila.appendChild(descripcionCliente);

            var acciones = document.createElement("td");
            // Botón de editar
            var btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.classList.add("btn", "btn-warning", "btnEditar");
            btnEditar.setAttribute("onclick", "editarCliente('" +  response.data[j].id_cliente + "')");
            var iconoEditar = document.createElement("i");
            iconoEditar.classList.add("fas", "fa-edit");
            btnEditar.prepend(iconoEditar);
            // Botón de eliminar
            var btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Desactivar";
            btnEliminar.classList.add("btn", "btn-danger", "btnDesactivar");
            btnEliminar.setAttribute("onclick", "desactivarCliente('" +  response.data[j].id_cliente + "')");
            // Agregar los botones al td
            acciones.appendChild(btnEditar);
            acciones.appendChild(btnEliminar);
            fila.appendChild(acciones);

            tbody.appendChild(fila);
        }
    });
}

function editarCliente(id_cliente){
    console.log("id_cliente para editar: " + id_cliente);
}


function TablaAdminPlataformas(){
    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoPlataformasT.php', function (response) {
        var tabla = id("tablaPlataformas");
        var tbody = tabla.getElementsByTagName("tbody")[0];

        // Limpiar contenido previo de la tabla
        tbody.innerHTML = '';

        // Iterar sobre los materiales y crear filas y celdas de tabla
        for (var j = 0; j < response.data.length; j++) {
            var fila = document.createElement("tr");

            var idPlataforma = document.createElement("td");
            idPlataforma.textContent = response.data[j].id_plataforma;
            fila.appendChild(idPlataforma);

            var descripcionPlataforma = document.createElement("td");
            descripcionPlataforma.textContent = response.data[j].descripcionPlataforma;
            fila.appendChild(descripcionPlataforma);

            var descripcionCliente = document.createElement("td");
            descripcionCliente.textContent = response.data[j].descripcionCliente;
            fila.appendChild(descripcionCliente);

            var acciones = document.createElement("td");
            // Botón de editar
            var btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.classList.add("btn", "btn-warning", "btnEditar");
            btnEditar.setAttribute("onclick", "editarPlataforma('" +  response.data[j].id_plataforma + "')");
            var iconoEditar = document.createElement("i");
            iconoEditar.classList.add("fas", "fa-edit");
            btnEditar.prepend(iconoEditar);
            // Botón de eliminar
            var btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Desactivar";
            btnEliminar.classList.add("btn", "btn-danger", "btnDesactivar");
            btnEliminar.setAttribute("onclick", "desactivarPlataforma('" +  response.data[j].id_plataforma + "')");
            // Agregar los botones al td
            acciones.appendChild(btnEditar);
            acciones.appendChild(btnEliminar);
            fila.appendChild(acciones);

            tbody.appendChild(fila);
        }
    });
}

function editarPlataforma(id_plataforma){
    console.log("id_plataforma para editar: " + id_plataforma);
}


function TablaAdminMateriales(){
    $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoConsultaMateriales.php', function (response) {
        var tabla = id("tablaMateriales");
        var tbody = tabla.getElementsByTagName("tbody")[0];

        // Limpiar contenido previo de la tabla
        tbody.innerHTML = '';

        // Iterar sobre los materiales y crear filas y celdas de tabla
        for (var j = 0; j < response.data.length; j++) {
            var fila = document.createElement("tr");

            var idMaterial = document.createElement("td");
            idMaterial.textContent = response.data[j].id_descripcion;
            fila.appendChild(idMaterial);

            var descripcionMaterial = document.createElement("td");
            descripcionMaterial.textContent = response.data[j].descripcionMaterial;
            fila.appendChild(descripcionMaterial);

            var numeroDeParte = document.createElement("td");
            numeroDeParte.textContent = response.data[j].numeroDeParte;
            fila.appendChild(numeroDeParte);

            var imgMaterial = document.createElement("td");
            var imagen = document.createElement("img");
            imagen.src = response.data[j].imgMaterial;
            imagen.classList.add("col-md-6", "mb-3", "ms-md-3", "rounded", "img-fluid","img-thumbnail");
            imgMaterial.appendChild(imagen);
            fila.appendChild(imgMaterial);

            var descripcionPlataforma = document.createElement("td");
            descripcionPlataforma.textContent = response.data[j].descripcionPlataforma;
            fila.appendChild(descripcionPlataforma);


            var acciones = document.createElement("td");
            // Botón de editar
            var iconoEditar = document.createElement("i");
            iconoEditar.classList.add("fas", "fa-edit");
            var btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.classList.add("btn", "btn-warning", "btnEditar");
            btnEditar.setAttribute("onclick", "editarMaterial('" +  response.data[j].id_descripcion + "')");
            btnEditar.prepend(iconoEditar);

            // Botón de eliminar
            var btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Desactivar";
            btnEliminar.classList.add("btn", "btn-danger", "btnDesactivar");
            btnEliminar.setAttribute("onclick", "desactivarMaterial('" +  response.data[j].id_descripcion + "')");
            // Agregar los botones al td
            acciones.appendChild(btnEditar);
            acciones.appendChild(btnEliminar);
            fila.appendChild(acciones);

            tbody.appendChild(fila);
        }
    });
}

function editarMaterial(id_descripcion){
    console.log("id_descripcion para editar: " + id_descripcion);
}
