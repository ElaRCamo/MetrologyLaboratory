SELECT distinct id_prueba, fechaSolicitud, fechaRespuesta, descripcionEstatus, descripcionPrueba, descripcionPrioridad, id_administrador,id_metrologo,
	id_solicitante, nombreUsuario, descripcionTipo
FROM  SolicitudPrueba s
LEFT JOIN Usuario u, TipoPrueba tp, Prioridad p, TipoUsuario tu, EstatusPrueba ep
WHERE s.id_estatusPrueba = ep.id_estatusPrueba
AND   s.id_tipoPrueba    = tp.id_tipoPrueba
AND   p.id_prioridad     = s.id_prioridad
AND   u.id_tipoUsuario   = tu.id_tipoUsuario

-- Consulta para seleccionar todo el material correspondiente a un número de prueba en especifico
SELECT m.numDeParte, m.cantidad, dm.descripcionMaterial, dm.imgMaterial, c.descripcionCliente, p.descripcionPlataforma
FROM   Material m, DescripcionMaterial dm, Plataforma p, Cliente c, EstatusMaterial em
WHERE  m.id_descripcion = dm.id_descripcion
AND    dm.id_plataforma = p.id_plataforma
AND    p.id_cliente = c.id_cliente
AND    m.id_estatusMaterial = em.id_estatusMaterial
AND    m.id_prueba = '2024-0001'



-- Colsulta para seleccionar los datos principales de una prueba
SELECT DISTINCT 
    id_prueba, 
    fechaSolicitud, 
    fechaRespuesta, 
    descripcionEstatus, 
    descripcionPrueba, 
    descripcionPrioridad, 
    s.id_administrador, 
    u_admin.nombreUsuario AS nombreAdmin, 
    tu_admin.descripcionTipo AS tipoAdmin,
    s.id_metrologo, 
    u_metro.nombreUsuario AS nombreMetro, 
    tu_metro.descripcionTipo AS tipoMetro,
    s.id_solicitante, 
    u_solic.nombreUsuario AS nombreSolic, 
    tu_solic.descripcionTipo AS tipoSolic
FROM  
    SolicitudPrueba s
LEFT JOIN 
    Usuario u_admin ON s.id_administrador = u_admin.id_usuario
LEFT JOIN 
    TipoUsuario tu_admin ON u_admin.id_tipoUsuario = tu_admin.id_tipoUsuario
LEFT JOIN 
    Usuario u_metro ON s.id_metrologo = u_metro.id_usuario
LEFT JOIN 
    TipoUsuario tu_metro ON u_metro.id_tipoUsuario = tu_metro.id_tipoUsuario
LEFT JOIN 
    Usuario u_solic ON s.id_solicitante = u_solic.id_usuario
LEFT JOIN 
    TipoUsuario tu_solic ON u_solic.id_tipoUsuario = tu_solic.id_tipoUsuario
LEFT JOIN 
    TipoPrueba tp ON s.id_tipoPrueba = tp.id_tipoPrueba
LEFT JOIN 
    Prioridad p ON s.id_prioridad = p.id_prioridad
LEFT JOIN 
    EstatusPrueba ep ON s.id_estatusPrueba = ep.id_estatusPrueba;

--Asignar valor predeterminado
ALTER TABLE Prueba
ALTER COLUMN id_estatusPrueba SET DEFAULT 5;

-- administrador por DEFAULT
ALTER TABLE Prueba ALTER COLUMN id_administrador SET DEFAULT '00030293'; -- Administrador principal
ALTER TABLE Prueba ALTER COLUMN id_metrologo SET DEFAULT '00000000'; --Sin asignar
ALTER TABLE Material ALTER COLUMN id_estatusMaterial SET DEFAULT  1; --Pendiente


---- PROCEDIMIENTO PARA DAR DE ALTA UNA SOLICITUD ---
CREATE PROCEDURE altaNuevaSolicitudPrueba
    @id_prueba char(10),
 -- Datos tabla SolicitudPrueba
    @fechaSolicitud date,
    @fechaRespuesta date,
    @ubicacionArchivos varchar(250),
    @especificaciones varchar(1000),
    @normaNombre varchar(250),
    @normaArchivo varchar(250),
    @id_estatusPrueba int,            --Predeterminado: 5 (En espera de aprobación)
    @id_administrador varchar(20),    --Predeterminado: '00030293'
    @id_solicitante varchar(20),
    @id_metrologo varchar(20),        --Predeterminado: '00000000' (sin asignar)
    @id_tipoPrueba int,
    @id_prioridad int,                --Predeterminado: 5 (sin asignar)

 -- Datos tabla alumnos_socioeconomicos

    @numDeParte varchar(150),
    @cantidad int,
    @id_descripcion int,
    @id_estatusMaterial int          --Predeterminado: 1 (material pendiente)

AS
BEGIN
    if @@error <> 0
    BEGIN
        ROLLBACK TRANSACTION
        SELECT 'Error: no se pudo registrar la solicitud.' as msg, @id_prueba id_prueba
        RETURN
    END
    BEGIN TRANSACTION

    INSERT INTO Prueba
          (`id_prueba`, `fechaSolicitud`, `fechaRespuesta`, `ubicacionArchivos`, `especificaciones`, `normaNombre`, `normaArchivo`, `id_estatusPrueba`, `id_administrador`, `id_solicitante`, `id_metrologo`, `id_tipoPrueba`, `id_prioridad`)
    VALUES
          (@id_prueba, CURDATE(), null, @ubicacionArchivos, @especificaciones, @normaNombre, @normaArchivo, null , null, null, null, null, null);

    if @@error != 0
    BEGIN
        ROLLBACK TRANSACTION
        SELECT 'Error: no se pudo registrar la solicitud.' AS msg, @id_prueba id_prueba
        RETURN
    END

    COMMIT TRANSACTION

        SELECT 'Solicitud registrada con éxito.' AS msg, @id_prueba id_prueba
    END
END







USE u543707098_PRODUCCION;
DELIMITER //

CREATE PROCEDURE altaNuevaSolicitudPrueba (
    IN id_prueba CHAR(10),
    IN fechaSolicitud DATE,
    IN fechaRespuesta DATE,
    IN ubicacionArchivos VARCHAR(255),
    IN especificaciones VARCHAR(255),
    IN normaNombre VARCHAR(255),
    IN normaArchivo VARCHAR(255),
    IN id_estatusPrueba INT,
    IN id_administrador VARCHAR(10),
    IN id_solicitante VARCHAR(10),
    IN id_metrologo VARCHAR(10),
    IN id_tipoPrueba INT,
    IN id_prioridad INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
ROLLBACK;
SELECT 'Error: no se pudo registrar la solicitud.' AS msg, id_prueba;
END;

START TRANSACTION;
INSERT INTO Prueba
VALUES (id_prueba, fechaSolicitud, NULL, ubicacionArchivos, especificaciones, normaNombre, normaArchivo, NULL , NULL, NULL, NULL, id_tipoPrueba, NULL);


IF MYSQL_ERRNO() <> 0 THEN
        ROLLBACK;
SELECT 'Error: no se pudo registrar la solicitud.' AS msg, id_prueba;
ELSE
        COMMIT;
SELECT 'Solicitud registrada correctamente.' AS msg, id_prueba;
END IF;
END;
//

DELIMITER ;





INSERT INTO `Usuario` (`id_usuario`, `nombreUsuario`, `correoElectronico`, `passwordHash`, `id_tipoUsuario`, `id_areaTrabajo`, `puesto`)
VALUES ('00030293', 'Mariela Reyes Camo', 'extern.mariela.reyes@grammer.com', '123456', '1', '3', 'Trainee');