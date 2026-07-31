const gameboard = (() => {
    let board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    return board;
})();

function createPlayer(name, marker) {
    
    return { name, marker, score: 0 };
};

function createGame(playerOne = "Player 1", playerTwo = "Player 2") {
    let checkGameCounter = 0;
    let turnCounter = 0;
    let tiles = document.querySelectorAll(".tile");
    const playerOneScore = document.querySelector("#player-one-score")
    const playerTwoScore = document.querySelector("#player-two-score")

    function getChoice(player) {
        let choice = document.querySelector(".clicked");
        let choiceId = Number(choice.id);
        let foundMatch = false
        gameboard.forEach(row => {
            let index = row.findIndex(num => num == choiceId)
            if (index != -1) {
                display.render(choice, player);
                row[index] = player.marker;
                foundMatch = true;
                turnCounter++;
                checkGameCounter++;
            }
        });
        if (foundMatch === false) {
            alert("Invalid choice!");
        }
    }

    function checkGame(player) {
        let rowWin = false;
        let columnWin = false;
        let horizontalWin = false;
        gameboard.forEach(row => {
            if (row[0] === row[1] && row[0] === row[2]) {
                rowWin = true;
            }});
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
            setTimeout(function () {
                alert(player.name + " wins!");
            }, 10);
            display.updateScore(player, turnCounter, playerOneScore, playerTwoScore);
            setTimeout(function () {
                game.resetRound();
            }, 10);
        }

        if (checkGameCounter === 9 && (!rowWin && !columnWin && !horizontalWin)) {
            setTimeout(function () {
                alert("It's a draw!")
                game.resetRound();
            }, 10);
        }
    }

    return {
        playRound(playerOne, playerTwo) {
            tiles.forEach(tile => {
                tile.addEventListener("click", () => {
                    tile.classList.add("clicked");
                    if (turnCounter % 2 === 0) {
                        getChoice(playerOne);
                        checkGame(playerOne);
                    } else if (turnCounter % 2 === 1) {
                        getChoice(playerTwo);
                        checkGame(playerTwo);
                    }
                    tile.classList.remove("clicked");
                })
        });
        },
        getScore(player) {
            return player.score;
        },

        reset() {
            turnCounter = 0;
            checkGameCounter = 0;
            gameboard.splice(0, 3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
            tiles.forEach(tile => {
                tile.textContent = "";
            });
            playerOne.score = 0;
            playerTwo.score = 0;
            playerOneScore.textContent = 0;
            playerTwoScore.textContent = 0;

        },

        resetRound() {
            turnCounter = 0;
            checkGameCounter = 0;
            gameboard.splice(0, 3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
            tiles.forEach(tile => {
                tile.textContent = "";
            });
        }
    }
}

function createDisplay() {
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-modal-close]');
    const overlay = document.getElementById('overlay');
    const form = document.getElementById('form');
    const noInput = document.querySelector(".no-name-inputted");
    const resetButton = document.querySelector(".restart");

    openModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest('.modal')
            closeModal(modal);
        })
    })

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll(".modal.active");
        modals.forEach(modal => {
            closeModal(modal);
        })
    })

    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add("active");
        overlay.classList.add("active");
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove("active");
        overlay.classList.remove("active");
    }

    form.addEventListener("submit", function(e) {
        const modal = form.closest('.modal');
        e.preventDefault();
        let playerOneName = document.querySelector("#player-one").value;
        let playerTwoName = document.querySelector("#player-two").value;
        globalThis.playerOne = createPlayer(playerOneName, "X");
        globalThis.playerTwo = createPlayer(playerTwoName, "O");
        globalThis.game = createGame(globalThis.playerOne, globalThis.playerTwo);
        
        document.querySelector("#playerOne").textContent = playerOneName;
        document.querySelector("#playerTwo").textContent = playerTwoName;

        noInput.classList.remove("no-name-inputted");
        form.reset();
        closeModal(modal);
    });

    if (noInput) {
        globalThis.playerOne = createPlayer("Player 1", "X");
        globalThis.playerTwo = createPlayer("Player 2", "O");
        globalThis.game = createGame(globalThis.playerOne, globalThis.playerTwo);
        globalThis.game.playRound(globalThis.playerOne, globalThis.playerTwo);
    }

    resetButton.addEventListener("click", game.reset);

    return {
        render(choice, player) {
            choice.textContent = player.marker;
        },
        updateScore(player, turnCounter, playerOneScore, playerTwoScore) {
            if (turnCounter % 2 === 1) {
                playerOneScore.textContent = player.score;
            } else if (turnCounter % 2 === 0) {
                playerTwoScore.textContent = player.score;
            }
        }
    }
}

display = createDisplay();



