<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");

  $servername = "localhost:3306";
  $username = "username";
  $password = "password";
  $dbname = "mydb";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error === TRUE) {
    die("Connection failed: " . $conn->connect_error);
  }

  $result = $conn->query("SELECT * FROM Books");

  $outp = "";

  while ($rs = $result->fetch_array(MYSQLI_ASSOC)){
    if ($outp != "") { $outp .= ","; }
    $outp .= '{"Title" : ' . '"' . $rs["Title"] . '" ,';
    $outp .= '"Author" : ' . '"' . $rs["Author"] . '" ,';
    $outp .= '"Description" :' . '"' . $rs["Description"] . '"}';
  }

  $outp = '{"records": [' . $outp . ']};';
  $conn->close();

  echo $outp;
?>
