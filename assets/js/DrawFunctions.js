function drawCard(x, y, name, move, energy, damage) {
    const cardWidth = 60;
    const cardHeight = 100;
  
    fill(200);
    rect(x - cardWidth / 2, y - cardHeight / 2, cardWidth, cardHeight);
  
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(10);
    text(name, x, y - cardHeight / 4);
    textSize(10);
    text(move, x, y);
    textSize(10);
    text(energy, x, y + cardHeight / 8);
    textSize(10);
    text("ﾀﾞﾒｰｼﾞ:" + damage, x, y + cardHeight / 4);
  }
  
  function drawDeck(x, y) {
    const deckWidth = 80;
    const deckHeight = 120;
  
    fill(255, 255, 0);
    rect(x - deckWidth / 2, y - deckHeight / 2, deckWidth, deckHeight);
  
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(18);
    text("山札", x, y)
  }
  