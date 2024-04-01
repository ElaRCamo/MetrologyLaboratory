<?php
include_once('connection.php');

$numNomina     = $_POST['numNomina'];
$nombreUsuario = $_POST['nombreUsuario'];
$correo        = $_POST['correo'];
$password      = $_POST['password'];

RegistrarUsuario($numNomina ,$nombreUsuario, $correo, $password);
function RegistrarUsuario($numNomina ,$nombreUsuario, $correo, $password){
    $con = new LocalConector();
    $conex = $con->conectar();

    $passwordS = sha1($password);
    $Nomina = str_pad($numNomina, 8, "0", STR_PAD_LEFT);

    //Verificar si el usuario ya existe:
    $consP="SELECT id_usuario FROM Usuario WHERE id_usuario = '$Nomina'";
    $rsconsPro=mysqli_query($conex,$consP);

    if(mysqli_num_rows($rsconsPro) == 1){
        echo '<script>alert("El usuario ya existe, verifique sus datos")</script>';
        echo "<META HTTP-EQUIV='REFRESH' CONTENT='1; URL=https://arketipo.mx/Produccion/ML/PW_MetrologyLaboratory/modules/sesion/Register.php'>";
        return 0;
    }
    else{

        $insertUsuario = "INSERT INTO `Usuario` (`id_usuario`, `nombreUsuario`, `correoElectronico`, `passwordHash`) VALUES ('$Nomina', '$nombreUsuario', '$correo', '$passwordS')";
        $rInsertUsuario = mysqli_query($conex,$insertUsuario);
        mysqli_close($conex);

        if(!$rInsertUsuario){
            echo '<script>alert("Error al registrar el usuario")</script>';
            return 0;
        }else{
            echo '<script>alert("Usuario registrado exitosamente")</script>';
            return 1;
        }
    }
}
?>

