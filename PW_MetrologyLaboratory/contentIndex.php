<main>
        <div class="page-header row headerLogo">
            <div class="col divTitle contenedorFecha">
                <!--<small id="saludoH">¡Hola ?php global $nombreUser; echo $nombreUser; ?>!</small>-->
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
                    <table>
                        <tr>
                            <td> <span class="las la-ruler-combined"></span></td>
                            <td>
                                <div class="card-progress">
                                    <small>ACTIVIDADES REALIZADAS ESTE MES</small>
                                </div>
                                <div class="card-head">
                                    <h2><span id="numeroPruebas"></span></h2>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="card">
                    <div class="card-progress">
                        <small>ACTIVIDADES PENDIENTES</small>
                    </div>
                    <div class="card-head">
                        <h2><span id="pruebasPendientes"></span></h2>
                        <span class="las la-pencil-ruler"></span>
                    </div>
                </div>

                <div class="card">
                    <div class="card-progress">
                        <small>TIEMPO DE RESPUESTA</small>
                    </div>
                    <div class="card-head">
                        <h2><span id="tiempoRespuesaSpan"></span>DÍAS/PRUEBA</h2>
                        <span class="lar la-clock"></span>
                    </div>
                </div>
                <div class="card">
                    <div class="card-progress">
                        <small>EFICIENCIA OPERATIVA</small>
                    </div>
                    <div class="card-head">
                        <h2><span id="pruebasPorDiaSpan"></span>PRUEBAS/DÍA</h2>
                        <span class="las la-chart-line"></span>
                    </div>

                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-sm-6" id="graficoPruebasPorMes"></div>
                    <div class="col-sm-6" id="graficoPorMesPorMetro"></div>
                </div>
                <div class="row" id="graficosCirculares">
                    <div class="col"></div>
                    <div class="col"></div>
                    <div class="col"></div>
                </div>
            </div>
        </div>
    </main>
</div>

<script>
    let fechaActual = new Date();
    let anioActual = fechaActual.getFullYear();

    pruebasMes();
    function pruebasMes() {
        $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoConsultaPruebasMes.php', function (data) {

            var Ene1 = 0, Feb1 = 0, Mar1 = 0, Abril1 = 0, May1 = 0, Jun1 = 0, Jul1 = 0, Ago1 = 0,
                Sep1 = 0, Oct1 = 0, Nov1 = 0, Dic1 = 0;

            for (var i = 0; i < data.data.length; i++) {

                if (data.data[i].Mes === '1') {
                    Ene1 = data.data[i].Pruebas;
                }
                if (data.data[i].Mes === '2') {
                    Feb1 = data.data[i].Pruebas;
                }
                if (data.data[i].Mes === '3') {
                    Mar1 = data.data[i].Pruebas;
                }
                if (data.data[i].Mes === '4') {
                    Abril1 = data.data[i].Pruebas;
                }
                if (data.data[i].Mes === '5') {
                    May1 = data.data[i].Pruebas;
                }
                if (data.data[i].Mes === '6') {
                    Jun1 = data.data[i].Pruebas;
                }
                if (data.data[i].Mes === '7') {
                    Jul1 = data.data[i].Pruebas;
                }
                if (data.data[i].Mes === '8') {
                    Ago1 = data.data[i].Pruebas;
                }
                if (data.data[i].Mes === '9') {
                    Sep1 = data.data[i].Pruebas;
                }
                if (data.data[i].Mes === '10') {
                    Oct1 = data.data[i].Pruebas;
                }
                if (data.data[i].Mes === '11') {
                    Nov1 = data.data[i].Pruebas;
                }
                if (data.data[i].Mes === '12') {
                    Dic1 = data.data[i].Pruebas;
                }

            }
            graficaPruebasMes(Ene1, Feb1, Mar1, Abril1, May1, Jun1, Jul1, Ago1, Sep1, Oct1, Nov1, Dic1);
        });
    }

    function graficaPruebasMes(Ene,Feb, Mar, Abril, May,Jun, Jul, Ago, Sep,Oct, Nov, Dic) {
        var options = {
            series: [{
                name: 'Pruebas realizadas',
                data: [Ene, Feb, Mar, Abril, May, Jun, Jul, Ago, Sep, Oct, Nov, Dic]
            }],
            chart: {
                type: 'bar',
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '65%',
                    endingShape: 'rounded',
                    colors: {
                        ranges: [{
                            from: 0,
                            to: 100,
                            color: '#005195'
                        }]
                    }

                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 5,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
            },
            yaxis: {
                title: {
                    text: 'Pruebas realizadas',
                    style: {
                        color: '#005195'
                    }
                },
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return " " + val + " pruebas"
                    }
                }
            },
            title: {
                text: 'Pruebas realizadas por mes, '+anioActual,
                floating: true,
                offsetY: 0,
                align: 'center',
                style: {
                    color: '#005195'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#graficoPruebasPorMes"), options);
        chart.render();
    }
    function pruebasMesMetrologo() {
        $.getJSON('https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/dao/daoConsultaPruebasMesMetro.php', function(data) {
            const transformedData = {};

            data.data.forEach(entry => {
                const month = parseInt(entry.Mes);
                const metrologo = entry.NombreMetrologo;
                const pruebas = parseInt(entry.Pruebas);

                if (!transformedData[metrologo]) {
                    transformedData[metrologo] = Array(12).fill(0); // Asumiendo 12 meses
                }
                transformedData[metrologo][month - 1] = pruebas; // Meses en ApexCharts son 0-indexed
            });

            graficaPruebasMesMetro(transformedData);
        });
    }

    function graficaPruebasMesMetro(transformedData) {
        const seriesData = Object.keys(transformedData).map(metrologo => ({
            name: metrologo,
            data: transformedData[metrologo]
        }));

        var options = {
            series: seriesData,
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            yaxis: {
                title: {
                    text: 'Pruebas'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " pruebas";
                    }
                }
            },
            title: {
                text: 'Pruebas realizadas por metrólogo, '+ anioActual,
                floating: true,
                offsetY: 0,
                align: 'center',
                style: {
                    color: '#005195'
                }
            }
        };

        var chart = new ApexCharts(document.querySelector("#graficoPorMesPorMetro"), options);
        chart.render();
    }

    pruebasMesMetrologo();


</script>