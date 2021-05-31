<?php

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $destinatario = '20187221@itla.edu.do';
    $asunto = 'Mensaje desde mi web';

    $carta = `De: $name \n`;
    $carta .= `Correo: $email \n`;
    $carta .= `Mensaje: $message`;

mail($destinatario, $asunto, $carta);
header('location: succes.html');
?>


