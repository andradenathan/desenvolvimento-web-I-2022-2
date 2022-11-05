function initializeBoard() {
    const element = document.getElementById("game-board");
    console.log(element);
    for(var i = 0; i < 8; i++) {
        for(var j = 0; j < 8; j++) {
            var square = document.createElement("div");
            square.className = "box";
            square.id = i + "-" + j;
            element.append(square);
        }
    }
}

initializeBoard();