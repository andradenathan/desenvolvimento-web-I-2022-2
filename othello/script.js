class Reversi {
    players = {
        "blank": {"code": 0, "color": null},
        "white": {"code": 1, "color": "white"},
        "black": {"code": 2, "color": "black"}
    }
    grid = [];
    rows = 8;
    columns = 8;
    score = null;
    turn = null;

    initializeBoard() {
        const element = document.querySelector(".game-board");

        for(let row = 1; row <= this.rows; row++) {
            this.grid[row] = [];
            for(let column = 1; column <= this.columns; column++) {
                let square = document.createElement("div");
                square.className = "box";
                this.bindMove(square, row, column); 
                this.grid[row][column] = this.initBoardPosition(element.appendChild(square));
            }
        }

        const board = document.querySelector(".score-bar");
        const boardElementWhite = document.createElement("h3");
        const boardElementBlack = document.createElement("h3");
        
        board.append(boardElementWhite);
        board.append(boardElementBlack);

        this.score = {
            "white": {
                "element": boardElementWhite,
                "value": 0
            },
            "black": {
                "element": boardElementBlack,
                "value": 0
            }
        }

        boardElementBlack.className = "score";
        boardElementBlack.textContent = "Preto: " + this.score.white.value;

        boardElementWhite.className = "score";
        boardElementWhite.textContent = "Branco: " + this.score.black.value;
    }   

    startGame() {
        this.setPlayerTurn(this.players.black);
        this.setBoardPositionColor(4, 4, this.players.white);
        this.setBoardPositionColor(5, 5, this.players.white);
        this.setBoardPositionColor(4, 5, this.players.black);
        this.setBoardPositionColor(5, 4, this.players.black);

        this.setScore(2, 2);
    }

    endGame() { 
        let result = (this.score.black.value > this.score.white.value) 
            ? 
                1 
            : ( 
                (this.score.white.value > this.score.black.value) ? -1 : 0 
            ), message;
        
        switch (result) {
            case 1:  { message = 'Preto venceu.'; } break;
            case -1: { message = 'Branco venceu.'; } break;
            case 0:  { message = 'Empate.'; } break;
        }
        
        alert(message);
        
        this.reset();
    }

    reset() {
        window.location.reload();
    }

    clearBoard() {
        for(let row = 1; row <= this.rows; row++) {
            for(let column = 1; column <= this.columns; column++) {
                this.setBoardPositionColor(row, column, this.players.blank);
            }
        }
    }

    checkEndGame() {
        for(let row = 1; row <= this.rows; row++) {
            for(let column = 1; column <= this.columns; column++) {
                if(this.isValidPosition(row, column) && !this.isBlankSquare(row, column)) 
                {
                    return false;
                }
            }
        }
    }

    setPlayerTurn(player) {
        this.turn = player;
    }

    setScore(black, white) {
        this.score.black.value = black;
        this.score.white.value = white;
        this.score.black.element.textContent = "Preto: " + this.score.black.value;
        this.score.white.element.textContent = "Branco: " + this.score.white.value;
    }

    changePlayerTurn() {
        let turn = (this.turn === this.players.black) ? this.players.white : this.players.black;
        this.setPlayerTurn(turn); 
    }

    bindMove(element, row, column) {
        const self = this;
        element.onclick = () => {
            if(self.canMove()) {
                if(self.isValidMove(row, column)) {
                    self.move(row, column);
                    if(!self.canMove()) {
                        self.changePlayerTurn();
                        if(!self.canMove()) {
                            self.endGame();
                        }
                    }
                   
                    if(self.checkEndGame()) {
                        self.endGame();
                    }
                }
            }
        }        
    }


    move(row, column) {
        let final = [], 
            current = this.turn, 
            rowCheck, 
            columnCheck,
            colorCheck = (current.code === this.players.black.code) ? this.players.white : this.players.black;
        
        for(let rowDirection = -1; rowDirection <= 1; rowDirection++) {
            for(let columnDirection = -1; columnDirection <= 1; columnDirection++) {
                if(rowDirection === 0 && columnDirection === 0) continue;

                rowCheck = row + rowDirection;
                columnCheck = column + columnDirection;

                let possibleMoves = [];

                while(
                    this.isValidPosition(rowCheck, columnCheck) &&
                    this.isBlankSquare(rowCheck, columnCheck) &&
                    this.grid[rowCheck][columnCheck].player.code === colorCheck.code
                ) {
                    possibleMoves.push([rowCheck, columnCheck]);
                    rowCheck += rowDirection;
                    columnCheck += columnDirection;
                }

                if(possibleMoves.length) {
                    if(
                        this.isValidPosition(rowCheck, columnCheck) &&
                        this.isBlankSquare(rowCheck, columnCheck) &&
                        this.grid[rowCheck][columnCheck].player.code === current.code
                    ) {
                        final.push([row, column]);
                        for(let move in possibleMoves) {
                            final.push(possibleMoves[move]);
                        }
                    }
                }
            }
        }

        if(final.length) {
            for(let move in final) {
                this.setBoardPositionColor(final[move][0], final[move][1], current);
            }
        }
        this.setPlayerTurn(colorCheck);
        this.calculateScore();
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
        this.grid[row][column].element.className = "box-" + player.color + "-selected";
    }

    isValidPosition(row, column) {
        return (row >= 1 && row <= this.rows) && (column >= 1 && column <= this.columns);
    }

    isValidMove(row, column) {
        let current = this.turn, 
            rowCheck, 
            columnCheck, 
            colorCheck = 
            (current.code === this.players.black.code) ? this.players.white : this.players.black;

        if(!this.isValidPosition(row, column) || this.isBlankSquare(row, column)) {
            return false;
        }
        
        for(let rowDirection = -1; rowDirection <= 1; rowDirection++) {
            for(let columnDirection = -1; columnDirection <= 1; columnDirection++) {
                if(rowDirection === 0 && columnDirection === 0) {
                    continue;
                }

                rowCheck = row + rowDirection;
                columnCheck = column + columnDirection;

                let isPieceFound = false;

                while(
                    this.isValidPosition(rowCheck, columnCheck) &&
                    this.isBlankSquare(rowCheck, columnCheck) &&
                    this.grid[rowCheck][columnCheck].player.code === colorCheck.code
                ) {
                    rowCheck += rowDirection;
                    columnCheck += columnDirection;
                    
                    isPieceFound = true;

                }
                
                if(isPieceFound) {
                    console.log("hey");
                    if(
                        this.isValidPosition(rowCheck, columnCheck) &&
                        this.isBlankSquare(rowCheck, columnCheck) &&
                        this.grid[rowCheck][columnCheck].player.code === current.code
                    ) {
                        console.log("valid move");
                        return true;
                    }
                }
            }
        }

        return false;
    }

    isBlankDefinition(player) {
        return (player.code === this.players.white.code) || (player.code === this.players.black.code);
    }

    isBlankSquare(row, column) {
        return this.isBlankDefinition(this.grid[row][column].player);
    }

    canMove() {
        for(let row = 1; row <= this.rows; row++) {
            for(let column = 1; column <= this.columns; column++) {
                if(this.isValidMove(row, column)) {
                    return true;
                }
            }
        }
    }

    calculateScore() {
        let scoreWhite = 0, scoreBlack = 0;
        for(let row = 1; row <= this.rows; row++) {
            for(let column = 1; column <= this.columns; column++) {
                if(this.isValidPosition(row, column) && this.isBlankSquare(row, column)) 
                {
                    if(this.grid[row][column].player.code === this.players.black.code) {
                        scoreBlack++;
                    } else {
                        scoreWhite++;
                    }
                }
            }
        }

        this.setScore(scoreBlack, scoreWhite);
    }
}