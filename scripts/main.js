'use strict';

const board = [];
const userX = 'X';
const userO = 'O';
let currentPlayer = userX;
const gameCanvas = document.querySelector('.game__content');
const gameRestart = document.querySelector('.game__restart');

function newGameRender() {
  for (let i = 0; i < 3; i++) {
    board[i] = [];

    for (let j = 0; j < 3; j++) {
      board[i][j] = NaN;
    }
  }

  gameCanvas.innerHTML = board.map((el, index) => {
    return el.map((item, i) => {
      return `<div data-item-line=${index}
                   data-item-cell=${i} class="game__item"></div>`;
    }).join('');
  }).join('');
}

function winFunction(stage) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (stage[i][0] === stage[i][1] && stage[i][0] === stage[i][2]) {
        return board[i][0];
      }

      if (stage[0][j] === stage[1][j] && stage[0][j] === stage[2][j]) {
        return board[0][j];
      }

      if (stage[0][0] === stage[1][1] && stage[0][0] === stage[2][2]) {
        return board[1][1];
      }

      if (stage[2][0] === stage[1][1] && stage[2][0] === stage[0][2]) {
        return board[1][1];
      }
    }
  }

  return false;
}

newGameRender();

gameCanvas.addEventListener('click', function(e) {
  const item = e.target.closest('.game__item');

  if (item.textContent || winFunction(board)) {
    return;
  }

  item.textContent = currentPlayer;
  board[item.dataset.itemLine][item.dataset.itemCell] = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? userO : userX;

  if (winFunction(board)) {
    gameCanvas.innerHTML += `<div class="winner__label">
    <span> ${winFunction(board)}</span> you win!!! Congratulation</div>`;
  }

  const draw = board.every(el =>
    el.every(i => i === 'X' || i === 'O'));

  if (draw) {
    gameCanvas.innerHTML += `<div class="winner__label">We have a draw</div>`;
  }
});

gameRestart.addEventListener('click', function() {
  newGameRender();
});
