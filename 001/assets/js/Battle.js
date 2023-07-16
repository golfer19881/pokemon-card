let deckWidth = 70;
let deckHeight = 90;
let deckX;
let deckY;
let trashX;
let trashY;
let sideDeckX;
let sideDeckCards = [];
let lostZoneX;
let lostZoneY;
let cards = [];
let selectedCard = null;

let snapPoints = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
 // VStarのセットアップ
 setupVStar();

  trashX = width - deckWidth - 20;
  trashY = height - deckHeight - 20;
  deckX = trashX;
  deckY = trashY - deckHeight - 20;
  sideDeckX = 20;
  lostZoneX = 20;
  lostZoneY = height - deckHeight - 20;

  for (let i = 0; i < 7; i++) {
    let x = lostZoneX + (i + 2) * (deckWidth + 10);
    let y = height - deckHeight - 20;
    cards.push({
      x: x,
      y: y,
      isMoving: false
    });
    snapPoints.push({ x: x, y: y });
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      sideDeckCards.push({
        x: sideDeckX + j * (deckWidth + 10),
        y: height - deckHeight - 170 - i * (deckHeight + 10),
        isMoving: false
      });
    }
  }
}

function draw() {
  background(220);
  // VStarの描画
  drawVStar();

  
  fill(255);
  rect(deckX, deckY, deckWidth, deckHeight);
  fill(0);
  text('山札', deckX + deckWidth / 2, deckY + deckHeight / 2);

  fill(255);
  rect(trashX, trashY, deckWidth, deckHeight);
  fill(0);
  text('トラッシュ', trashX + deckWidth / 2, trashY + deckHeight / 2);

  fill(255);
  rect(lostZoneX, lostZoneY, deckWidth, deckHeight);
  fill(0);
  text('ロストゾーン', lostZoneX + deckWidth / 2, lostZoneY + deckHeight / 2);

  for (let i = 0; i < sideDeckCards.length; i++) {
    let card = sideDeckCards[i];
    fill(255);
    rect(card.x, card.y, deckWidth, deckHeight);
    fill(0);
    text('サイドデッキ' + (i + 1), card.x + deckWidth / 2, card.y + deckHeight / 2);
  }

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    fill(255);
    rect(card.x, card.y, deckWidth, deckHeight);
    fill(0);
    text('カード' + (i + 1), card.x + deckWidth / 2, card.y + deckHeight / 2);
  }
}

function mousePressed() {
  // VStarがクリックされたかチェック
  if (checkVStarClick()) {
    // VStarがクリックされたので、他のマウスクリック処理をスキップ
    return;
  }

  if (mouseX > deckX && mouseX < deckX + deckWidth && mouseY > deckY && mouseY < deckY + deckHeight) {
    cards.push({
      x: lostZoneX + (cards.length + 2) * (deckWidth + 10),
      y: height - deckHeight - 20,
      isMoving: false
    });
  } else {
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      if (mouseX > card.x && mouseX < card.x + deckWidth && mouseY > card.y && mouseY < card.y + deckHeight) {
        selectedCard = card;
        card.isMoving = true;

        cards.splice(i, 1);
        cards.push(card);
        break;
      }
    }

    for (let i = 0; i < sideDeckCards.length; i++) {
      let card = sideDeckCards[i];
      if (mouseX > card.x && mouseX < card.x + deckWidth && mouseY > card.y && mouseY < card.y + deckHeight) {
        selectedCard = card;
        card.isMoving = true;

        sideDeckCards.splice(i, 1);
        sideDeckCards.push(card);
        break;
      }
    }
  }
}



function mouseDragged() {
  if (selectedCard && selectedCard.isMoving) {
    selectedCard.x = mouseX - deckWidth / 2;
    selectedCard.y = mouseY - deckHeight / 2;
  }
}

function getClosestSnapPoint(x, y) {
  let closestSnapPoint = null;
  let closestDistance = Infinity;
  for (let i = 0; i < snapPoints.length; i++) {
    let snapPoint = snapPoints[i];
    let distance = dist(x, y, snapPoint.x, snapPoint.y);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestSnapPoint = snapPoint;
    }
  }
  return closestSnapPoint;
}
