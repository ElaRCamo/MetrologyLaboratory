<main>
        <div class="page-header row headerLogo">
            <div class="col divTitle contenedorFecha">
                <small id="saludoH">¡Hola <?php global $nombreUser; echo $nombreUser; ?>!</small>
                <h3 class="fechaH">Indicadores <?php
                    $meses = array(
                        1 => "Enero",
                        2 => "Febrero",
                        3 => "Marzo",
                        4 => "Abril",
                        5 => "Mayo",
                        6 => "Junio",
                        7 => "Julio",
                        8 => "Agosto",
                        9 => "Septiembre",
                        10 => "Octubre",
                        11 => "Noviembre",
                        12 => "Diciembre"
                    );
                    echo $meses[date("n")];
                    ?>
                    <!--php setlocale(LC_TIME, 'es_ES.UTF-8'); echo strftime('%B'); ?> --></h3>
                <h6 class="fechaH"><?php echo date("d/m/Y"); ?></h6>
            </div>
            <div class="logoRight col-sm-3">
                <div>
                    <img class="logoGrammer2-img logoR img-responsive" alt="LogoGrammer" src="https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory\imgs\logoGrammer.png"><br>
                </div>
                <div>
                    <span><small>GRAMMER AUTOMOTIVE PUEBLA S. A. DE C. V.</small></span>
                </div>
            </div>
        </div>
        <div class="page-content">
            <div class="analytics">
                <div class="card">
                    <div class="card-head">
                        <h2><span id="numeroPruebas"></span></h2>
                        <span class="las la-ruler-combined"></span>
                    </div>
                    <div class="card-progress">
                        <small>Pruebas realizadas este mes</small>
                    </div>
                </div>
                <div class="card">
                    <div class="card-head">
                        <h2><span id="pruebasPendientes"></span></h2>
                        <span class="las la-pencil-ruler"></span>
                    </div>
                    <div class="card-progress">
                        <small>Pruebas pendientes </small>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head">
                        <h2><span id="tiempoRespuesaSpan"></span> días/prueba</h2>
                        <span class="lar la-clock"></span>
                    </div>
                    <div class="card-progress">
                            <small>Tiempo de respuesta</small>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head">
                        <h2><span id="pruebasPorDiaSpan"></span> pruebas/día</h2>
                        <span class="las la-chart-line"></span>
                    </div>
                    <div class="card-progress">
                        <small>Eficiencia Operativa</small>
                    </div>
                </div>
            </div>
            <div class="graphics">


            </div>
        </div>
    </main>
</div>
