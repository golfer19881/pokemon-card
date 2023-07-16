class Card {
  constructor() {
    this.attack = Math.floor(Math.random() * 10) + 1;
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

// レイアウト変更


// トラッシュゾーンを定義（位置
let trashZone = {
  x: 680,
  y: 450,
  width: 80,
  height: 120
};

let deck = [];
let hand = [];

function setup() {
  createCanvas(800, 600);

  for (let i = 0; i < 60; i++) {
    deck.push({
      name: "ヒトカゲ",
      move: "ひのこ",
      energy: "火１",
      damage: 40
    });
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

  for (let i = 0; i < hand.length; i++) {
    let x = 60 + i * (60 + 16);
    let y = height - 100;
    let card = hand[i];
    drawCard(x, y, card.name, card.move, card.energy, card.damage);
  }

  drawDeck(720, 350);

  // トラッシュゾーン
  fill(255, 255, 0); // Red color for the trash zone
  rect(trashZone.x, trashZone.y, trashZone.width, trashZone.height); 
  
  // トラッシュゾーン文字など
  textAlign(CENTER, CENTER); 
  fill(0); // White color for the text
  textSize(14); // Set the font size to 20 pixels
  text("トラッシュ", trashZone.x + trashZone.width / 2, trashZone.y + trashZone.height / 2);

}

function mouseClicked() {
  if (mouseX > 680 && mouseX < 760 && mouseY > 290 && mouseY < 410) {
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

let player1 = new Player();
let player2 = new Player();

battle(player1, player2);
