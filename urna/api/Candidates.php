<?php

const VEREADOR = "vereador";

function buscaVereadores() {
    include("db/Connect.php");

    $query = "SELECT * FROM vereadores";
    $queryResponse = $connection->query($query);
    if(!$queryResponse) { http_response_code(500); die("Erro ao buscar dados de vereadores"); }

    $data = $queryResponse->fetch_assoc();
    
    $vereadores = array();
    $vereadores["titulo"] = VEREADOR;
    $vereadores["numeros"] = strlen($data["numero"]);

    do {
        $vereadores["candidatos"][$data["numero"]] = $data;
        unset($vereadores["candidatos"][$data["numero"]]["numero"]);
        $data = $queryResponse->fetch_assoc();
    } while(!is_null($vereadores));

    return $vereadores;
}