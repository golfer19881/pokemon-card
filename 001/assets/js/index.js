class Card {
  constructor() {
    this.attack = Math.floor(Math.random() * 10) + 1;
    this.x = 0;  // Initial x position
    this.y = 0;  // Initial y position
    this.isDragging = false;  // Whether the card is being dragged
  }
}

class Player {
  constructor() {
    this.hand = new Card();
  }

  playCard() {
    return this.hand;
  }
}

function battle(player1, player2) {
  let card1 = player1.playCard();
  let card2 = player2.playCard();

  console.log(`Player 1's card attack: ${card1.attack}`);
  console.log(`Player 2's card attack: ${card2.attack}`);

  if (card1.attack > card2.attack) {
    console.log("Player 1 wins!");
  } else if (card1.attack < card2.attack) {
    console.log("Player 2 wins!");
  } else {
    console.log("It's a draw!");
  }
}

let trashZone = {
  x: 680,
  y: 450,
  width: 80,
  height: 120
};

let deck = [];
let hand = [];

// Define the size of the battlefield
let battlefieldSize = 300;

function setup() {
  createCanvas(980, 600);

  for (let i = 0; i < 60; i++) {
    deck.push(new Card());
  }

  for (let i = 0; i < 7; i++) {
    if (deck.length > 0) {
      let card = deck.pop();
      hand.push(card);
    }
  }
}

function draw() {
  background(220);

  // Calculate the center of the canvas
  let centerX = width / 2;
  let centerY = height / 2;

  // Draw a rectangle in the center of the canvas to represent the battlefield
  rectMode(CENTER);
  rect(centerX, centerY, battlefieldSize, battlefieldSize);

  for (let i = 0; i < hand.length; i++) {
    let x = 60 + i * (60 + 16);
    let y = height - 100;
    let card = hand[i];
    drawCard(x, y, card.name, card.move, card.energy, card.damage);
  }
  // 山札の位置
  drawDeck(820, 350);

  // トラッシュゾーン
  fill(255, 255, 0); // Red color for the trash zone
  rect(trashZone.x, trashZone.y, trashZone.width, trashZone.height); 

  // トラッシュゾーン文字など
  textAlign(CENTER, CENTER); 
  fill(0); // White color for the text
  textSize(14); // Set the font size to 20 pixels
  text("トラッシュ", trashZone.x + trashZone.width / 2, trashZone.y + trashZone.height / 2);
}
//-------------
function touchStarted() {
  // Check if the touch is over any of the cards in the hand
  for (let card of hand) {
    if (isOverCard(card, touchX, touchY)) {
      // Start dragging the card
      card.isDragging = true;
    }
  }
}

function touchEnded() {
  // Stop dragging all cards
  for (let card of hand) {
    card.isDragging = false;
  }
}

function touchMoved() {
  // Move any cards that are being dragged
  for (let card of hand) {
    if (card.isDragging) {
      card.x = touchX;
      card.y = touchY;
    }
  }

  // This line is needed to prevent the default browser behavior for touchmove events, which is scrolling
  return false;
}





//--------------
function mouseClicked() {
  // 山札を引く判定の位置
  if (mouseX > 780 && mouseX < 860 && mouseY > 290 && mouseY < 410) {
    if (deck.length > 0) {
      let card = deck.pop();
      hand.push(card);
    }
  }
}


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

let player1 = new Player();
let player2 = new Player();

battle(player1, player2);

// Check if the mouse is over a card
function isOverCard(card, mouseX, mouseY) {
  const cardWidth = 60;
  const cardHeight = 100;

  // Check if the mouse is over the card
  return mouseX > card.x && mouseX < card.x + cardWidth &&
         mouseY > card.y && mouseY < card.y + cardHeight;
}

function mousePressed() {
  // Check if the mouse is over any of the cards in the hand
  for (let card of hand) {
    if (isOverCard(card, mouseX, mouseY)) {
      // Start dragging the card
      card.isDragging = true;
    }
  }
}

function mouseReleased() {
  // Stop dragging all cards
  for (let card of hand) {
    card.isDragging = false;
  }
}

function mouseDragged() {
  // Move any cards that are being dragged
  for (let card of hand) {
    if (card.isDragging) {
      card.x = mouseX;
      card.y = mouseY;
    }
  }
}
