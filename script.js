const gameboard = (() => {
    let board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    return board;
})();

function createPlayer(name, marker) {
    
    return { name, marker, score: 0 };
};

function createGame(playerOne = "Player 1", playerTwo = "Player 2") {
    let gameState = true;
    let checkGameCounter = 0;

    function getChoice(player) {
        if (gameState) {
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

        if ((rowWin || columnWin || horizontalWin) && gameState) {
            player.score++;
            gameState = false;
            alert(player.name + " wins!");
            game.resetRound();
        }
       
        checkGameCounter++;

        if (checkGameCounter === 9 && (!rowWin && !columnWin && !horizontalWin)) {
            gameState = false;
            alert("It's a draw!")
            game.resetRound();
        }
    }

    return {
        playRound() {
            gameState = true;
            while (gameState) {
                getChoice(playerOne);
                checkGame(playerOne);
                if (!gameState) break;
                getChoice(playerTwo);
                checkGame(playerTwo);
            }
        },
        getScore(player) {
            return player.score;

        },
        reset() {
            checkGameCounter = 0;
            gameboard.splice(0, 3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
            playerOne.score = 0;
            playerTwo.score = 0;
        },

        resetRound() {
            checkGameCounter = 0;
            gameboard.splice(0, 3, [1, 2, 3], [4, 5, 6], [7, 8, 9]);
            game.playRound();
        }
    }
}

function createDisplay() {
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-modal-close]');
    const overlay = document.getElementById('overlay');
    const form = document.getElementById('form');
    const noInput = document.querySelector(".no-name-inputted");
    const resetButton = document.querySelector(".restart")

    resetButton.addEventListener("click", game.reset());

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
    }


    return {
        render() {

        }
    }
}

display = createDisplay();



