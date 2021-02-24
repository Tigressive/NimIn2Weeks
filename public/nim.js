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
