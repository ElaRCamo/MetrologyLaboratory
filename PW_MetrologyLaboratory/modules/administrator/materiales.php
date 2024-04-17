<!-- Modal NuevoMaterial-->
<div class="modal fade container-fluid" id="nuevoMaterial" aria-hidden="true" aria-labelledby="nuevoMateriallLabel" tabindex="-1">
    <div class="modal-lg modal-dialog modal-dialog-centered modal-dialog-scrollable ">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="nuevoMateriallLabel">Agregar material</h5><br>
                <button type="button" class="btn-close" id="" data-bs-dismiss="modal" onclick="" aria-label="Close"></button>
            </div>
            <div class="modal-body row">
                <form method="POST" enctype="multipart/form-data">
                    <div class="mb-3">
                        <div class="help-block with-errors"></div>
                        <label for="descMaterialN" class="form-label">Descripción del material: </label>
                        <input type="text" name="descMaterialN" id="descMaterialN" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <div class="help-block with-errors"></div>
                        <label for="numParteN" class="form-label" onchange="plataformaModal()">Número de parte: </label>
                        <input id="numParteN" name="numParteN" type="text" class="form-control" placeholder="Número de parte*" required data-error="Por favor ingresa el número de parte" readonly>
                    </div>
                    <div class="mb-3">
                        <div class="help-block with-errors"></div>
                        <label for="imgMaterialN" class="form-label" >Imagen del material: </label>
                        <input type="file" placeholder="Imagen del material" class="form-control" id="imgMaterialN" name="imgMaterialN" accept="image">
                    </div>
                    <div class="mb-3">
                        <div class="help-block with-errors"></div>
                        <label for="descMPlataformaN" class="form-label">Plataforma: </label>
                        <select class="form-control" id="descMPlataformaN" onchange=""  name="descMPlataformaN" title="Plataforma" required data-error="Por favor seleccione el cliente" >
                            <option value="">Seleccione una plataforma*</option>
                        </select>
                    </div>
                    <div class="row justify-content-end">
                        <div class="">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="">Close</button>
                            <button type="button" class="btn btn-secondary" onclick=""><i class="las la-save"></i>Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>