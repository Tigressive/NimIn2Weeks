

class Game {
    piles = [3,3,0]
    turn = true;
    gameOver = false;
    winner = true;
    takeLastWin = true;

    constructor(difficulty, takeWin) {
        this.takeLastWin = takeWin;
        switch(difficulty)
        {
            default:
                break;
            case 2:
                piles = [2, 5, 7, 0];
                break;
            case 3:
                piles = [2,3,8,9,0];
                break;
        }
    }

    get piles() {
        return this.piles
    }

    get turn() {
        return this.turn
    }

    get gameOver() {
        return this.gameOver
    }

    get winner() {
        return this.winner
    }

    get takeLastWin() {
        return this.takeLastWin
    }


    takeTurn(move){
        if (!(move == 1 || move == 2) || this.piles[0] < move || this.gameOver){
            return false;
        }

        this.piles[0] -= move;
        temp = [];
        if (this.piles[0] == 0){
            for(i = 1; i < this.piles.length; i++)
            {
                temp[i - 1] = this.piles[i];
            }
            this.piles = temp;
        }

        if (this.piles[0] == 0){
            this.gameOver = true;
            if (this.takeLastWin){
                winner = this.turn;
            }
            else{
                winner = !this.turn;
            }
        }

        this.turn = !this.turn;
        return true;
    }


}