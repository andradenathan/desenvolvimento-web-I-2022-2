<?php

require './vendor/autoload.php';

include("db/connect.php");
include("cors.php");

$votos = json_decode(file_get_contents("php://input"), true)["votos"];

foreach($votos as $voto) {
    $query = sprintf(
        "UPDATE candidato SET votos = votos + 1 WHERE titulo = '%s' AND numero = '%s'",
        mysqli_real_escape_string($connection, $voto["etapa"]),
        mysqli_real_escape_string($connection, $voto["numero"]),
    );

    if($connection->query($query) === false) {
        http_response_code(500);
        die("Erro ao atualizar dados");
    }
}

cors();