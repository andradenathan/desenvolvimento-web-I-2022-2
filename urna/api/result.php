<?php

require './vendor/autoload.php';

echo ("
<div>
  <h1> Resultado das eleições</h1>
  </br>
");

exibirResultado();

zerarVotacao();

echo("</div>");

function exibirResultado() {
  resultadoVereadores();
  resultadoPrefeitos();
}

function resultadoVereadores() {
  include ('db/connect.php');
  

  $query = $connection->query("
    SELECT * 
    FROM candidato
    WHERE titulo = 'vereador'
    ORDER BY votos DESC, nome ASC;
  ");
  

  if(!$query) {
    http_response_code(500);
    die("Erro ao obter vereadores.");
  }
  

  $maxVotosVereadores = $connection->query("
  SELECT max(votos)
  FROM candidato
  WHERE titulo = 'vereador';
  ");
  

  if(!$maxVotosVereadores) {
    http_response_code(500);
    die("Erro ao obter número de votos do vereador mais votado.");
  }
  
  $maxVotosVereadores = intval($maxVotosVereadores->fetch_row()[0]);
  
  echo ("
  <table>
    <tr>
      <th colspan=\"4\">Vereador</th>
    </tr>
    <tr>
      <th>Numero</th><th>Nome</th><th>Partido</th><th>Votos</th>
    </tr>
  ");
  
  $linha = $query->fetch_assoc();
  
  do {
    if (intval($linha['votos']) === $maxVotosVereadores && $maxVotosVereadores !== 0) {
      $tr = "<tr class=\"vencedor\">";
      $linha['nome'] = $linha['nome'] . '&nbsp;&nbsp;&nbsp;' . '<span class="eleito-badge">Eleito</span>';
    } else {
      $tr = "<tr>";
    }
    
    $tr .= sprintf("<td>%s</td><td>%s</td><td>%s</td><td>%s</td> </tr>",
      $linha['numero'], $linha['nome'], $linha['partido'], $linha['votos']);
    echo($tr);
    $linha = $query->fetch_assoc();
  } while (!is_null($linha));
  
  echo("</table>");

}

function resultadoPrefeitos() {
  include ('db/connect.php');
  
  $query = $connection->query("
  SELECT *
  FROM candidato INNER JOIN vice ON candidato.numero = vice.numero
  WHERE titulo = 'prefeito'
  ORDER BY votos DESC, candidato.nome ASC;
  ");
  

  if(!$query) {
    http_response_code(500);
    die("Erro ao obter prefeitos.");
  }
  

  $maximoVotosPrefeito = $connection->query("
    SELECT max(votos)
    FROM candidato
    WHERE titulo = 'prefeito';
  ");
  

  if(!$maximoVotosPrefeito) {
    http_response_code(500);
    die("Erro ao obter número de votos do prefeito mais votado.");
  }


  $maximoVotosPrefeito = intval($maximoVotosPrefeito->fetch_row()[0]);
  

  echo ("
  <table>
    <tr>
      <th colspan=\"3\">Prefeito</th><th colspan=\"3\">Vice-prefeito</th>
    </tr>
    <tr>
      <th>Numero</th><th>Nome</th><th>Partido</th><th>Nome</th><th>Partido</th><th>Votos</th>
    </tr>
  ");
  
  $linha = $query->fetch_row();
  

  do {
    if (intval($linha[5]) == $maximoVotosPrefeito && $maximoVotosPrefeito !== 0) {
      $tr = "<tr class=\"vencedor\">";
      $linha[1] = $linha[1] . '&nbsp;&nbsp;&nbsp;' . '<span class="eleito-badge">Eleito</span>';
      $linha[7] = $linha[7] . '&nbsp;&nbsp;&nbsp;' . '<span class="eleito-badge">Eleito</span>';
    } else {
      $tr = "<tr>";
    }
    
    $tr .= sprintf("<td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td> </tr>",
      $linha[0], $linha[1], $linha[3], $linha[6], $linha[7], $linha[5]);
    echo($tr);
    $linha = $query->fetch_row();
  } while ( $linha != null);
  echo("</br></br>");
  echo("</table>");
}

function zerarVotacao() {
  
  echo("
  <a href=\"./start.php\">
     <button>Zerar votos</button>
  </a>
  ");
}

?>

<style>

* {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}

h1 {
  text-align: center;
}

div {
  margin-left: auto;
  margin-right: auto;
}

table {
  border-collapse: collapse;
  width: 80%;
  margin: 0 auto;
}

th {
  background-color: coral;
  color: white;
}

tr:nth-child(even) {background-color: #f2f2f2;}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

table, th, td {
  border:1px solid black;
}

.vencedor {
  background-color: lightyellow;
}

.eleito-badge {
  background-color: green;
  color: white;
  padding: 4px 8px;
  text-align: center;
  border-radius: 5px;
}

a {
  margin-left: auto;
  margin-right: auto;
  display: table;
}

button {
  margin-top: 40px;
  font-size: 18px; 
}
</style>