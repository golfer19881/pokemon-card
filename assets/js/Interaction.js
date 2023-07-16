export function isOverCard(card, touchX, touchY) {
  const cardWidth = 60;
  const cardHeight = 100;

  // Check if the touch is over the card
  return touchX > card.x && touchX < card.x + cardWidth &&
         touchY > card.y && touchY < card.y + cardHeight;
}

export function touchStarted() {
  // Check if the touch is over any of the cards in the hand
  for (let card of hand) {
    if (isOverCard(card, touchX, touchY)) {
      // Start dragging the card
      card.isDragging = true;
    }
  }
}

export function touchEnded() {
  // Stop dragging all cards
  for (let i = 0; i < hand.length; i++) {
    let card = hand[i];
    card.isDragging = false;

    // Check if the card is within the battlefield
    let centerX = width / 2;
    let centerY = height / 2;
    if (card.x > centerX - battlefieldSize / 2 && card.x < centerX + battlefieldSize / 2 &&
        card.y > centerY - battlefieldSize / 2 && card.y < centerY + battlefieldSize / 2) {
      
      // Move the card from the hand to the battlefield
      hand.splice(i, 1);
      battlefield.push(card);
      break;  // Only move one card at a time
    }
  }
}
