import { Player } from './Player.js';

export function battle(player1, player2) {
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

let player1 = new Player();
let player2 = new Player();

battle(player1, player2);
