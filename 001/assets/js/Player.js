import { Card } from './Card.js';

export class Player {
  constructor() {
    this.hand = new Card();
  }

  playCard() {
    return this.hand;
  }
}
