export class Card {
  constructor() {
    this.attack = Math.floor(Math.random() * 10) + 1;
    this.x = 0;  // Initial x position
    this.y = 0;  // Initial y position
    this.isDragging = false;  // Whether the card is being dragged
  }
}
