

// // // // Game Board and Game state // // // //

let gameBoardArray = [0,0,0,0,0,0,0,0,0];
let gameModeTwoPlayer = false;
let gameModeOnePlayer = false;
let playerOneName = "Player one";
let playerTwoName = "Player two";
let playerOneScore = 0;
let playerTwoScore = 0;

// // // // // // // //


// // // // Keep Score // // // //

const playerOneScoreBoard = document.querySelector('.player-one-score');
const playerTwoScoreBoard = document.querySelector('.player-two-score');

// // // // DONE // // // //


// // // // Win Conditions // // // //

const isThereAWinner = () => {

    let winOneH = gameBoardArray[0] + gameBoardArray[1] + gameBoardArray[2];

    let winTwoH = gameBoardArray[3] + gameBoardArray[4] + gameBoardArray[5];

    let winThreeH = gameBoardArray[6] + gameBoardArray[7] + gameBoardArray[8];

    let winOneL = gameBoardArray[0] + gameBoardArray[3] + gameBoardArray[6];

    let winTwoL = gameBoardArray[1] + gameBoardArray[4] + gameBoardArray[7];

    let winThreeL = gameBoardArray[2] + gameBoardArray[5] + gameBoardArray[8];

    let winOneD = gameBoardArray[0] + gameBoardArray[4] + gameBoardArray[8];

    let winTwoD = gameBoardArray[2] + gameBoardArray[4] + gameBoardArray[6];

    if (winOneH === 3 || winTwoH === 3 || winThreeH === 3 || winOneL === 3 || winTwoL === 3 || winThreeL === 3 || winOneD === 3 || winTwoD === 3) {
        return 1;
    } else if (winOneH === -3 || winTwoH === -3 || winThreeH === -3 || winOneL === -3 || winTwoL === -3 || winThreeL === -3 || winOneD === -3 || winTwoD === -3) {
        return -1;
    }

};

// // // // // // // //

// // // // Reset Functions // // // //

const resetGameState = () => {
    playerOneScore = 0;
    playerTwoScore = 0;
    playerOneScoreBoard.innerHTML = playerOneScore;
    playerTwoScoreBoard.innerHTML = playerTwoScore;
    inputs.forEach((input) => {
        input.innerHTML = "";
    });
    playerOneTurn = true;
    playerTurn.innerHTML = `${playerOne.innerHTML}'s turn!`;
    gameBoardArray = [0,0,0,0,0,0,0,0,0];

}

const resetGameBoard = () => {
    inputs.forEach((input) => {
        input.innerHTML = "";
    });
    playerOneTurn = true;
    playerTurn.innerHTML = `${playerOne.innerHTML}'s turn!`;
    gameBoardArray = [0,0,0,0,0,0,0,0,0];
}

// // // // DONE // // // //


// // // // BOT (VERY BAD) // // // //

const botFunction = () => {
    if (gameModeOnePlayer && !playerOneTurn) {
        setTimeout(() => {
        let botMove = Math.floor(Math.random() * 9);
        if (gameBoardArray[botMove] === 0) {
            gameBoardArray[botMove] = -1;
            inputs[botMove].innerHTML = "O";
            playerOneTurn = true;
            playerTurn.innerHTML = `${playerOne.innerHTML}r turn!`;
        } else {
            botFunction();
        }
        }, 1000);
    }
};

// // // // DONE // // // //


// // // // Input Fields // // // //

// 1. Get the input field
const inputs = document.querySelectorAll('.input');
const playerTurn = document.querySelector('.player-turn');

let playerOneTurn = true;
inputs.forEach((input, index) => {
  input.addEventListener('click', () => {

        if (gameBoardArray[index] !== 0) {
          return;
        }

    if (playerOneTurn) {
        input.innerHTML = "X";
        playerOneTurn = false;
        playerTurn.innerHTML = `${playerTwo.innerHTML}'s turn!`
        gameBoardArray[index] = 1;
    } else if (!playerOneTurn && gameModeTwoPlayer) {
        input.innerHTML = "O";
        playerOneTurn = true;
        playerTurn.innerHTML = `${playerOne.innerHTML}'s turn!`;
        gameBoardArray[index] = -1;
    }

    botFunction();

    if (isThereAWinner() === 1) {
        setTimeout(() => {
            resetGameBoard();
            playerOneScore += 1;
            playerOneScoreBoard.innerHTML = playerOneScore;
        }, 1000);
    } else if (isThereAWinner() === -1) {
        setTimeout(() => {
        resetGameBoard();
        playerTwoScore += 1;
        playerTwoScoreBoard.innerHTML = playerTwoScore;
        }, 1000);
    } else if (!gameBoardArray.includes(0)) {
        setTimeout(() => {
            resetGameBoard();
        }, 1000);
    }

  })

});


// // // // // // // //


// // // // RULES MODAL // // // //
//  Get the modal
const rulesModal = document.querySelector('.rules-modal');
// Get the button that opens the modal
const rules = document.querySelector('.rules');
// Get the <span> element that closes the modal
const close = document.querySelector('.close');

// When the user clicks on the button, open the modal
rules.addEventListener("click", () => {
  rulesModal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
close.addEventListener("click", () => {
  rulesModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === rulesModal) {
    rulesModal.style.display = "none";
  }
});

// // // // DONE // // // //


// // // // INTRO MODAL // // // //

const introModal = document.querySelector('.intro-modal');

const onePlayerButton = document.querySelector('#one-player');

const twoPlayerButton = document.querySelector('#two-players');

onePlayerButton.addEventListener("click", () => {

    introModal.style.display = "none";
    gameModeOnePlayer = true;
    playerTwoName = "Computer";

    playerOneNameTrack.style.display = "block";
    playerTwoNameTrack.style.display = "block";
    playerOneScoreTrack.style.display = "block";
    playerTwoScoreTrack.style.display = "block";

    playerOne.innerHTML = `${playerOneName}`;
    playerTwo.innerHTML = `${playerTwoName}`;
    playerTurn.innerHTML = `${playerOneName}'s turn!`;

    newPlayersButton.style.display = "none";

});

twoPlayerButton.addEventListener("click", () => {
    gameModeTwoPlayer = true;
    introModal.style.display = "none";
    nameInputModal.style.display = "block";
});

// // // // DONE // // // //


// // // // NAME INPUT MODAL AND START BUTTON// // // //

const nameInputModal = document.querySelector('.names-modal');

const playerOneNameInput = document.querySelector('.player-one-name-input');

const playerTwoNameInput = document.querySelector('.player-two-name-input');

const playerOne = document.querySelector('.player-one-name');

const playerTwo = document.querySelector('.player-two-name');

const startButton = document.querySelector('#start');

const playerOneNameTrack = document.querySelector('.player-one-name');
const playerTwoNameTrack = document.querySelector('.player-two-name');
const playerOneScoreTrack = document.querySelector('.player-one-score');
const playerTwoScoreTrack = document.querySelector('.player-two-score');

startButton.addEventListener("click", () => {

    let playerOneName = playerOneNameInput.value;
    let playerTwoName = playerTwoNameInput.value;

    if ((playerOneName === "" || playerOneName === null || playerOneName === undefined) || (playerTwoName === "" || playerTwoName === null || playerTwoName === undefined)) {
        playerOneName = "Player one";
        playerTwoName = "Player two";
    }

    playerOne.innerHTML = `${playerOneName}`;
    playerTwo.innerHTML = `${playerTwoName}`;
    playerTurn.innerHTML = `${playerOneName}'s turn!`;

    playerOneNameTrack.style.display = "block";
    playerTwoNameTrack.style.display = "block";
    playerOneScoreTrack.style.display = "block";
    playerTwoScoreTrack.style.display = "block";

    nameInputModal.style.display = "none";
    resetGameState()

});


// // // // RESET BUTTON // // // //

const resetButton = document.querySelector('#reset');

resetButton.addEventListener("click", () => {
    resetGameState();
});

// // // // DONE // // // //


// // // // NEW PLAYERS BUTTON // // // //

const newPlayersButton = document.querySelector('#new-players');

newPlayersButton.addEventListener("click", () => {
   nameInputModal.style.display = "block";
});

// // // // DONE // // // //


// // // // CHANGE MODE BUTTON // // // //

const changeModeButton = document.querySelector('#change-mode');
changeModeButton.addEventListener("click", () => {
    introModal.style.display = "block";
    gameModeOnePlayer = false;
    gameModeTwoPlayer = false;
    playerOneNameTrack.style.display = "none";
    playerTwoNameTrack.style.display = "none";
    playerOneScoreTrack.style.display = "none";
    playerTwoScoreTrack.style.display = "none";
    newPlayersButton.style.display = "block";
    resetGameState();
});

// // // // DONE // // // //




