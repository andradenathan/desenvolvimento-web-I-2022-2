<?php

require './vendor/autoload.php';

const VEREADOR = "vereador";
const PREFEITO = "prefeito";

function recuperaPrefeitos(): array {    
    $query = "SELECT * FROM candidato INNER JOIN vice ON candidato.numero = vice.numero WHERE titulo = 'prefeito'";
    $queryResponse = acessarDados($query);

    $data = $queryResponse->fetch_row();

    $prefeitos = array();
    $prefeitos['titulo'] = 'prefeito';
    $prefeitos['numeros'] = strlen($data[0]);
    
    do {
        $prefeitos['candidatos'][$data[0]]['nome'] = $data[1];
        $prefeitos['candidatos'][$data[0]]['partido'] = $data[3];
        $prefeitos['candidatos'][$data[0]]['foto'] = $data[4];
        $prefeitos['candidatos'][$data[0]]['vice']['nome'] = $data[6];
        $prefeitos['candidatos'][$data[0]]['vice']['partido'] = $data[7];
        $prefeitos['candidatos'][$data[0]]['vice']['foto'] = $data[8];
        $data = $queryResponse->fetch_row();
    } while(!is_null($data));
    
    echo json_encode($prefeitos);
    return [];
}

function recuperaVereadores(): array {    
    $query = "SELECT numero, nome, partido, titulo, foto FROM candidato WHERE titulo = 'vereador'";
    $queryResponse = acessarDados($query);

    $data = $queryResponse->fetch_assoc();
    
    $vereadores = array();
    $vereadores["titulo"] = VEREADOR;
    $vereadores["numeros"] = strlen($data["numero"]);

    do {
        $vereadores["candidatos"][$data["numero"]] = $data;
        unset($vereadores["candidatos"][$data["numero"]]["numero"]);
        $data = $queryResponse->fetch_assoc();
    } while(!is_null($data));

    return $vereadores;
}

function acessarDados(string $query): \mysqli_result {
    include("db/connect.php");
    
    $queryResponse = $connection->query($query);

    if(!$queryResponse) {
        http_response_code(500);
        die("Erro ao obter dados");
    }

    return $queryResponse;
}

recuperaPrefeitos();