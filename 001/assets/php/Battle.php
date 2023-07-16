<?php
$url = "https://www.pokemon-card.com/deck/deckRegistCall.php";
$response = file_get_contents($url);
echo $response;
?>
