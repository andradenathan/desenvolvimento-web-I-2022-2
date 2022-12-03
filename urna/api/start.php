<?php

require "./vendor/autoload.php";

include("db/connect.php");

$query = $connection->query("UPDATE candidato SET votos = 0");

if(!$query) {
    http_response_code(500);
    die("Erro ao atualizar dados");
} else {
    echo '<script type="text/javascript">';
    echo 'alert("Votação zerada com sucesso!")'; 
    echo '</script>';
     
    header("Location: ./result.php");
    die();
}