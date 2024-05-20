function validarFormNewRequest(sEvaluacion,sTipoPrueba,iNorma){

    const esEvaluacionValido =  validarSelect(sEvaluacion);
    const esTipoPruebaValido =  validarSelect(sTipoPrueba);
    const esNormaValido = validarInput(iNorma);

    if(esEvaluacionValido && esTipoPruebaValido && esNormaValido){
        alert("inputs validos");
        //validacionSolicitud();
    }
}


function validarSelect(idSelect) {
    const selectElement = document.getElementById(idSelect);
    const errorMessage = selectElement.getAttribute('data-error');


    const selectedValue = selectElement ? selectElement.value : null;
    const feedbackElement = selectElement.nextElementSibling;

    if (!selectedValue) {
        if (selectElement) {
            selectElement.classList.add('is-invalid');
            if (feedbackElement) {
                feedbackElement.style.display = 'block';
                feedbackElement.textContent = selectElement.getAttribute('data-error');
            }
        }
        return false;
    } else {
        if (selectElement) {
            selectElement.classList.remove('is-invalid');
            if (feedbackElement) {
                feedbackElement.style.display = 'none';
            }
        }
        return true;
    }
}

function validarInput(idInput) {
    const inputElement = document.getElementById(idInput);
    const inputValue = inputElement.value.trim();

    if (!inputValue) {
        inputElement.classList.add('is-invalid');
        return false;
    } else {
        inputElement.classList.remove('is-invalid');
        return true;
    }
}



