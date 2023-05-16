const gameBoard = document.getElementById("board");
const gameMessage = document.getElementById("message");
const gameButtons = document.getElementById("buttons");

let currPlayer = 'X';
let turnCount = 0;
let xScore = 0;
let oScore = 0;
let numDraws = 0;
let gameOver = false;

let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

genBoard();

function genBoard() {
    gameBoard.innerHTML = "";
    const squares = [];
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            if (board[i][j] == 'X') {
                square.innerHTML = "X";
                square.classList.add("x");
            } else if (board[i][j] == 'O') {
                square.innerHTML = "O";
                square.classList.add("o");
            } else if (!gameOver) {
                square.addEventListener("click", () => {place(i,j)});
            }
            squares.push(square);
        }
    }
    squares.forEach((square) => {gameBoard.appendChild(square)});
}

function place(row, col) {
    board[row][col] = currPlayer;
    turnCount++;
    checkGameStatus(row, col);
}

function checkGameStatus(row, col) {
    let won = false;
    for (let i=0; i<4; i++) {
        if (checkLine(i, row, col, currPlayer) == 3) {
            won = true;
            break;
        }
    }
    if (won) {
        gameOver = true;
        handleWin();
    } else if (turnCount == 9) {
        gameOver = true;
        handleDraw();
    } else {
        nextPlayer();
    }
}

function checkLine(type, row, col, target) {
    let count = 0;
    switch (type) {
        case 0:
            for (let i=0; i<3; ++i) { // check row
                if (board[row][i] == target) count++;
            }
            break;
        case 1:
            for (let i=0; i<3; ++i) { // check col
                if (board[i][col] == target) count++;
            }
            break;
        case 2:
            if (row != col) break;
            for (let i=0; i<3; ++i) { // check diag
                if (board[i][i] == target) count++;
            }
            break;
        case 3:
            if (row + col != 2) break;
            for (let i=0; i<3; ++i) { // check antidiag
                if (board[i][2-i] == target) count++;
            }
            break;
    }
    return count;
}

function nextPlayer() {
    if (currPlayer == 'X') {
        currPlayer = 'O';
        document.body.style.backgroundColor = "#669BBC";
    } else {
        currPlayer = 'X';
        document.body.style.backgroundColor = "#C1121F";
    }
    genBoard();
    gameMessage.innerHTML = "<span id=" + currPlayer +  ">" + currPlayer + "</span>'s turn";
}

function handleWin() {
    if (currPlayer == 'X') {
        xScore++;
        document.getElementById("xscore").innerHTML = xScore;
    } else {
        oScore++;
        document.getElementById("oscore").innerHTML = oScore;
    }
    genBoard();
    gameMessage.innerHTML = "<span id=\"" + currPlayer +  "\">" + currPlayer 
    + "</span> won!";
    genButtons();
}

function handleDraw() {
    numDraws++;
    genBoard();
    document.getElementById("numdraws").innerHTML = numDraws;
    gameMessage.innerHTML = "<span id=\"draw\">Nobody</span> won!";
    genButtons();
}

function genButtons() {
    gameButtons.innerHTML = "";
    const replayButton = document.createElement("div");
    replayButton.classList.add("button");
    replayButton.innerHTML = "REPLAY"
    replayButton.addEventListener("click", resetGame);
    gameButtons.appendChild(replayButton);
}

function resetGame() {
    gameButtons.innerHTML = "";
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            board[i][j] = ' ';
        }
    }
    gameOver = false;
    player = 'X';
    turnCount = 0;
    gameMessage.innerHTML = "<span id=" + currPlayer +  ">" + currPlayer + "</span>'s turn";
    genBoard();
}