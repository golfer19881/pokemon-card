function drawDeck(x, y) {
  const deckWidth = 80;
  const deckHeight = 120;

  // Draw the deck as a yellow rectangle
  fill(255, 255, 0);
  rect(x - deckWidth / 2, y - deckHeight / 2, deckWidth, deckHeight);

  // Draw the text "Deck" on top of the rectangle
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("山札", x, y);
}

function draw() {
  // ... your other drawing code ...

  // Draw the deck at position (720, 350)
  drawDeck(720, 350);
}
