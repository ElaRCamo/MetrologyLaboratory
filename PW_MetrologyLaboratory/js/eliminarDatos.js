function desactivarCliente(id_cliente) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "¿Estás seguro(a)?",
        text: "Todas las plataformas y materiales asociados a este cliente también se desactivarán.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Sí, desactivar!",
        cancelButtonText: "¡No, cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/desactivarCliente.php?id_cliente='+id_cliente,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id_cliente)
            }).then(res => {
                TablaAdminClientes();
                if(!res.ok){
                    console.log('Problem');
                    return;
                }
                return res.json();
            })
                .then(data => {
                    console.log('Success');
                    swalWithBootstrapButtons.fire({
                        title: "¡Desactivado!",
                        text: "El cliente ha sido desactivado.",
                        icon: "success"
                    });
                })
                .catch(error =>{
                    console.log(error);
                });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "El cliente sigue activo y visible para todos.",
                icon: "error"
            });
        }
    });
}

function desactivarPlataforma(id_plataforma) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "¿Estás seguro(a)?",
        text: "Todos los materiales asociados a esta plataforma también se desactivarán.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Sí, desactivar!",
        cancelButtonText: "¡No, cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/desactivarPlataforma.php?id_plataforma='+id_plataforma,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id_plataforma)
            }).then(res => {
                TablaAdminPlataformas();
                if(!res.ok){
                    console.log('Problem');
                    return;
                }
                return res.json();
            })
                .then(data => {
                    console.log('Success');
                    swalWithBootstrapButtons.fire({
                        title: "¡Desactivado!",
                        text: "La plataforma ha sido desactivada.",
                        icon: "success"
                    });
                })
                .catch(error =>{
                    console.log(error);
                });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "La plataforma sigue activa y visible para todos.",
                icon: "error"
            });
        }
    });
}

function eliminarMaterial(id_descripcion){
    console.log("id_descripcion para eliminar: " + id_descripcion);
}