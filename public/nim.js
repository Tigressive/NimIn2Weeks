class Game {
  piles = [26, 26];
  legalMoves = [1, 2];
  turn = true;
  gameOver = false;
  winner = true;
  takeLastWin = true;

  constructor(difficulty, takeWin) {
    this.takeLastWin = takeWin;
    switch (difficulty) {
      case 1:
        this.piles = [3, 3];
        break;
      case 2:
        this.piles = [2, 5, 7];
        break;
      case 3:
        this.piles = [2, 3, 8, 9];
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

let game = new Game(difficulty, misere);

// TODO: Render piles for user
displayPiles = (piles) => {
  let strPiles = "";
  for (let pile of piles) {
    for (let i = 0; i < pile; i++) {
      strPiles += "| ";
    }
    strPiles += "<br>";
  }
  document.getElementById("piles").innerHTML = strPiles;
};

// TODO: Get input from user(s)/ai
selectMove = (piles, legalMoves) => {
  let amountRadio = document.getElementsByName("takeAmount");
  let pileRadio = document.getElementsByName("takePile");
  let amount, pile;

  for (element of amountRadio) {
    if (element.checked) {
      amount = Number.parseInt(element.value);
      break;
    }
  }

  for (element of pileRadio) {
    if (element.checked) {
      pile = Number.parseInt(element.value) - 1;
      break;
    }
  }

  console.log("Move", [amount, pile]);
  game.takeTurn(amount, pile);
  displayPiles(game.piles);
  console.log("State", game.piles);
  if (game.gameOver) {
    displayWinner();
  }
};

displayWinner = (winner) => {
  document.getElementById("winner").innerHTML =
    "Winner: " + (game.winner ? 1 : 2);
};

displayPiles(game.piles);
