let difficulty = "Medium";
let misere = false;

switch (difficulty) {
  case "Easy": difficulty = 1; break;
  case "Medium": difficulty = 2; break;
  case "Hard": difficulty = 3; break;
  default: difficulty = 2;
}

class Game {
  piles = [3, 3];
  legalMoves = [1, 2, 4];
  turn = true;
  gameOver = false;
  winner = true;
  takeLastWin = true;

  constructor(difficulty, takeWin) {
    this.takeLastWin = takeWin;
    switch (difficulty) {
      case 1:
        piles = [21];
      case 2:
        piles = [26, 26];
        break;
      case 3:
        piles = [31, 31, 31];
        break;
      default:
        break;
    }
  }

  get piles() {
    return this.piles;
  }

  get turn() {
    return this.turn;
  }

  get gameOver() {
    return this.gameOver;
  }

  get winner() {
    return this.winner;
  }

  get takeLastWin() {
    return this.takeLastWin;
  }

  get legalMoves() {
    return this.legalMoves;
  }

  takeTurn(move, pile) {
    if (
      !legalMoves.includes(move) ||
      pile > this.piles.length ||
      this.piles[pile] < move ||
      this.gameOver
    ) {
      return false;
    }

    this.piles[pile] -= move;
    temp = true;

    for (i = 0; i < this.piles.length; i++) {
      if (this.piles[i] > 0) {
        temp = false;
      }
    }

    if (temp) {
      this.gameOver = true;
      if (this.takeLastWin) {
        winner = this.turn;
      } else {
        winner = !this.turn;
      }
    }

    this.turn = !this.turn;
    return true;
  }
}

let game = Game(difficulty, misere);

// TODO: Render piles for user
displayPiles = (piles) => {
  console.log(piles);
}

selectMove = (piles, legalMoves) => {
  move = legalMoves[Math.floor(Math.random() * legalMoves.length)];
  pile = Math.floor(Math.random() * piles.length);
  while (piles[pile] < move || piles[pile] == 0) {
    move = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    pile = Math.floor(Math.random() * piles.length);
  }

  return [move, pile];
}

while (!game.gameOver()) {
  displayPiles(game.piles());

  selectMove(game.piles(), game.legalMoves());
  
  game.takeTurn(move, pile);
}
