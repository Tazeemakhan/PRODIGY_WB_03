const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';  // Human player
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winSound = document.getElementById('winSound');
const clickSound = document.getElementById('clickSound');
const winMessage = document.getElementById('winMessage');
const modal = document.getElementById('winModal');
const closeModal = document.getElementsByClassName('close')[0];
const playAgainButton = document.getElementById('playAgain');

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handles human player clicks
function handleClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] === '' && isGameActive) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    clickSound.play();
    cell.classList.add('played');

    if (checkWin(currentPlayer)) {
      winSound.play();
      showWinMessage(`${currentPlayer} wins!`);
      return;
    } else if (!gameState.includes('')) {
      showWinMessage("It's a draw!");
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Check for win
function checkWin(player) {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return gameState[index] === player;
    });
  });
}

// Show the pop-up message
function showWinMessage(message) {
  winMessage.textContent = message;
  modal.style.display = 'flex';
  isGameActive = false;
}

// Reset the game
function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('played');
  });
  currentPlayer = 'X';
  isGameActive = true;
  modal.style.display = 'none';
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
playAgainButton.addEventListener('click', resetGame);
closeModal.addEventListener('click', resetGame);
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    resetGame();
  }
});
