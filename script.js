const gameboard = (() => {
    let board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    return board;
})();

function createPlayer(name, marker, score) {
    
    return { name, marker, score };
};

function createGame() {
    
    function getChoice(player) {
        let choice = Number(prompt(player.name + "'s turn"));
        let foundMatch = false
        gameboard.forEach(row => {
            let index = row.findIndex(num => num == choice)
            if (index != -1) {
                foundMatch = true;
                return row[index] = player.marker;
            }
        });
        if (foundMatch === false) {
            alert("Invalid choice!");
            getChoice(player);
        }
    }

    function checkGame(player) {
        let rowWin = false;
        let columnWin = false;
        let horizontalWin = false;
        gameboard.forEach(row => {
            if (row[0] === row[1] && row[0] === row[2]) {
                rowWin = true;
            }
        for (let index = 0; index < 3; index++) {
            if (gameboard[0][index] === gameboard[1][index] && gameboard[0][index] === gameboard[2][index]) {
                columnWin = true;
            }
        }
        if (gameboard[0][0] === gameboard[1][1] && gameboard[0][0] === gameboard[2][2]) {
            horizontalWin = true;
        }
        if (gameboard[0][2] === gameboard[1][1] && gameboard[0][2] === gameboard[2][0]) {
            horizontalWin = true;
        }

        if (rowWin || columnWin || horizontalWin) {
            player.score++;
            alert(player.name + " wins!");
            resetRound();
        }
            
        });
    }

    function resetRound() {
        playRound(playerOne, playerTwo);
    }


    return {
        playRound(playerOne, playerTwo) {
            while (true) {
                getChoice(playerOne);
                checkGame(playerOne);
                getChoice(playerTwo);
                checkGame(playerTwo);
            }
        },
        getScore() {

        },
        reset() {

        }
    }
}