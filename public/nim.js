let difficulty = "Medium";
let misere = false;

switch (difficulty) {
  case "Easy":
    difficulty = 1;
    break;
  case "Medium":
    difficulty = 2;
    break;
  case "Hard":
    difficulty = 3;
    break;
  default:
    difficulty = 2;
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
        this.piles = [21];
      case 2:
        this.piles = [26, 26];
        break;
      case 3:
        this.piles = [31, 31, 31];
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
      !this.legalMoves.includes(move) ||
      pile > this.piles.length ||
      this.piles[pile] < move ||
      this.gameOver
    ) {
      return false;
    }

    this.piles[pile] -= move;
    let temp = true;

    for (let i = 0; i < this.piles.length; i++) {
      if (this.piles[i] > 0) {
        temp = false;
      }
    }

    if (temp) {
      this.gameOver = true;
      if (this.takeLastWin) {
        this.winner = this.turn;
      } else {
        this.winner = !this.turn;
      }
    }

    this.turn = !this.turn;
    return true;
  }
}

let game = new Game(difficulty, misere);

// TODO: Render piles for user
displayPiles = (piles) => {
  console.log(piles);
};

// TODO: Get input from user(s)/ai
selectMove = (piles, legalMoves) => {
  move = legalMoves[Math.floor(Math.random() * legalMoves.length)];
  pile = Math.floor(Math.random() * piles.length);
  while (piles[pile] < move || piles[pile] == 0) {
    move = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    pile = Math.floor(Math.random() * piles.length);
  }

  return [move, pile];
};

while (!game.gameOver) {
  displayPiles(game.piles);

  selectMove(game.piles, game.legalMoves);

  game.takeTurn(move, pile);
}

console.log("Winner: player " + (game.winner ? 1 : 2));
