const gameboard = (() => {
    let board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    return board;
})();

function createPlayer(name, marker, score) {
    
    return { name, marker, score };
};

function createGame() {
    
    function getChoice(player) {
        let choice = prompt(player.name + "'s turn");
        board.forEach(row => {
            let index = row.findIndex(choice)
            if (index !== -1) {
                return row[index] = player.marker;
            }
        });
        return alert("Invalid choice!");
    }

    function checkGame(player) {
        let rowWin = false;
        let columnWin = false;
        let horizontalWin = false;
        board.forEach(row => {
            if (row[0] === row[1] && row[0] === row[2]) {
                rowWin = true;
            }
        for (let index = 0; index > 3; index++) {
            if (board[0][index] === board[1][index] && board[0][index === board[2][index]]) {
                columnWin = true;
            }
        }
        if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            horizontalWin = true;
        }
        if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            horizontalWin = true;
        }

        if (rowWin || columnWin || horizontalWin) {
            player.score++;
            alert(player.name + " wins!");
            resetRound();
        }
            
        });
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