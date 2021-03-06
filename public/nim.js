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

let difficulty = localStorage.getItem("nim_options_difficulty");
let misere = localStorage.getItem("nim_options_misere") == "true";
let playStyle = localStorage.getItem("nim_options_play_style");
let takePile1 = document.getElementById("takePile1")
let takePile2 = document.getElementById("takePile2")
let takePile3 = document.getElementById("takePile3")
let takePile4 = document.getElementById("takePile4")
let tekaPile1 = document.getElementById("tekaPile1")
let tekaPile2 = document.getElementById("tekaPile2")
let tekaPile3 = document.getElementById("tekaPile3")
let tekaPile4 = document.getElementById("tekaPile4")

takePile1.style.visibility = "hidden";
tekaPile1.style.visibility = "hidden";
takePile2.style.visibility = "hidden";
tekaPile2.style.visibility = "hidden";
takePile3.style.visibility = "hidden";
tekaPile3.style.visibility = "hidden";
takePile4.style.visibility = "hidden";
tekaPile4.style.visibility = "hidden";

diff = 0
switch (difficulty) {
  case "Hard":
    diff++;
    takePile4.style.visibility = "visible";
    tekaPile4.style.visibility = "visible";
  case "Medium":
  default:
    diff++;
    takePile3.style.visibility = "visible";
    tekaPile3.style.visibility = "visible";
  case "Easy":
    diff++;
    takePile1.style.visibility = "visible";
    tekaPile1.style.visibility = "visible";
    takePile2.style.visibility = "visible";
    tekaPile2.style.visibility = "visible";
}

difficulty = diff;

let game = new Game(difficulty, !misere);

displayTurn = (turn) => {
  document.getElementById("turn").innerHTML = "Turn: " + (game.turn ? 1 : 2);
}

displayTurn(game.turn);

// TODO: Render piles for user
displayPiles = (piles) => {
  let strPiles = "";
  let img = new Image();
  img.src = "images/fire.png";
  img.width = 50;
  for (let pile of piles) {
    for (let i = 0; i < pile; i++) {
      strPiles += img.outerHTML;
    }
    strPiles += "<br>";
  }
  document.getElementById("piles").innerHTML = strPiles;
};

// TODO: Get input from user(s)/ai
selectMove = (piles, legalMoves) => {
  let amount, pile;

  if (playStyle == "Single" && game.turn == false) {
    let move = get_move(piles, legalMoves, misere, difficulty / 3);
    amount = move[1];
    pile = move[0];
  } else {
    let amountRadio = document.getElementsByName("takeAmount");
    let pileRadio = document.getElementsByName("takePile");

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
  }

  console.log("Move", [amount, pile]);
  game.takeTurn(amount, pile);
  displayTurn(game.turn);
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
