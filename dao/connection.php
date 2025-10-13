<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class LocalConector{
    private $host = "IP:PUERTO";
    private $usuario = "USER";
    private $clave = "PASSWORD";
    private $db = "DB";
    private $conexion;

    public function conectar(){
        $this->conexion = mysqli_connect($this->host, $this->usuario, $this->clave, $this->db);
        if ($this->conexion->connect_error) {
            die("Error de conexión: " . $this->conexion->connect_error);
        }
        //echo "conexion exitosa";
        return $this->conexion;
    }
}
