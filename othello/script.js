class Reversi {
    players = {
        "blank": {"code": 0, "color": null},
        "white": {"code": 1, "color": "white"},
        "black": {"code": 2, "color": "black"}
    }
    grid = [];
    rows = 8;
    columns = 8;
    turn = null;
    
    initializeBoard() {
        const element = document.querySelector(".game-board");
        for(let i = 0; i < 8; i++) {
            this.grid[i] = [];
            for(let j = 0; j < 8; j++) {
                let square = document.createElement("div");
                square.className = "box";
                square.id = i + "-" + j;
                this.grid[i][j] = j; 
                element.append(square);
            }
        }
    }   

    startGame() {
        this.setPlayerTurn(this.players.black);

    }

    setPlayerTurn(player) {
        this.turn = player;
    }

    initBoardPosition(element) {
        return {
            'player': this.players.blank,
            'element': element
        }
    }

    setBoardPositionColor(row, column, player) {
        if(!this.isValidPosition(row, column)) {
            return;
        }

        this.grid[row][column].player = player;
        this.grid[row][column].element.style.visibility = (
            player.code === this.players.white.code || player.code === this.players.black.code
        ) ? "visible" : "hidden";
    }

    isValidPosition(row, column) {
        return (row >= 1 && row <= this.rows) && (column >= 1 && column <= this.columns);
    }

    isValidMove(row, column) {
        let current = this.turn, 
            rowCheck, 
            columnCheck, 
            colorCheck = (current.code === this.players.black.code) 
                ? this.players.white.code : this.players.black.code;
        if(!this.isValidPosition(row, column)) {
            return false;
        }
        
        for(let rowDirection = -1; rowDirection <= 1; rowDirection++) {
            for(let columnDirection = -1; columnDirection <= 1; columnDirection++) {
                if(rowDirection === 0 && columnDirection === 0) {
                    continue;
                }
                rowCheck = row + rowDirection;
                columnCheck = column + columnDirection;

                let isPieceFounded = false;

                while(
                    this.isValidPosition(rowCheck, columnCheck) &&
                    this.grid[rowCheck][columnCheck].player.code === colorCheck.code
                ) {
                    rowCheck = row + rowDirection;
                    columnCheck = column + columnDirection;
                    isPieceFounded = true;

                }
                if(isPieceFounded) {
                    if(
                        this.isValidPosition(rowCheck, columnCheck) &&
                        this.grid[rowCheck][columnCheck].player.code === current.code
                    ) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}

const game = new Reversi();
console.log(game.grid);
window.onload = () => game.initializeBoard();