var counter = 0;
var xWins = 0;
var oWins = 0;
var cells = document.querySelectorAll('#field td');
var header = document.getElementById('header');
var scoreDisplay = document.getElementById('score');

function updateScore() {
    scoreDisplay.innerText = 'X: ' + xWins + ' | O: ' + oWins;
}

function isVictory() {
    var combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (var combo of combos) {
        if (cells[combo[0]].innerHTML == cells[combo[1]].innerHTML && cells[combo[1]].innerHTML == cells[combo[2]].innerHTML && cells[combo[0]].innerHTML != '') {
            return true;
        }
    }
    return false;
}

function endGame() {
    for (var cell of cells) {
        cell.removeEventListener('click', tap);
    }

    setTimeout(function () {
        header.innerText = 'Tic Tac Toe';
        clearBoard();
    }, 2000);

    updateScore();

    if (xWins >= 5 || oWins >= 5) {
        congratulateWinner();
    }
}

function congratulateWinner() {
    var winner = xWins >= 5 ? 'X' : 'O';
    header.innerText = winner + ' wins the round!';
    playCelebrationAnimations(); 
}

function playCelebrationAnimations() {
    document.body.classList.add('celebration');
    setTimeout(function () {
        document.body.classList.remove('celebration');
        startNewRound();
    }, 3000); 
}

function startNewRound() {
    xWins = 0;
    oWins = 0;
    updateScore();
    startGame();
}



function tap(event) {
    if (counter % 2 == 0) {
        event.target.innerHTML = '<img src="img/close.png" width=100>';
    }
    else {
        event.target.innerHTML = '<img src="img/circle.png" width=100>';
    }

    if (isVictory()) {
        if (counter % 2 == 0) {
            header.innerText = 'X is winner!';
            xWins++;
        } else {
            header.innerText = 'O is winner!';
            oWins++;
        }
        endGame();
    } else if (counter == 8) {
        header.innerText = 'Draw!';
        endGame();
    }

    counter++;
    event.target.removeEventListener('click', tap);
}


function clearBoard() {
    for (var cell of cells) {
        cell.innerHTML = '';
        cell.addEventListener('click', tap);
    }
}

function startGame() {
    header.innerText = 'Tic Tac Toe';
    counter = 0;
    clearBoard();
    updateScore();
}


startGame()