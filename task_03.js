document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const cells = document.querySelectorAll('[data-cell]');
    const gameStatus = document.getElementById('game-status');
    const restartButton = document.getElementById('restart-button');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-cell'));

        if (gameState[cellIndex] !== '' || !gameActive) {
            return;
        }

        // Update game state
        gameState[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        // Check for win
        if (checkWin()) {
            gameActive = false;
            gameStatus.textContent = `${currentPlayer} wins!`;
            return;
        }

        // Check for draw
        if (!gameState.includes('')) {
            gameActive = false;
            gameStatus.textContent = 'Draw!';
            return;
        }

        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `${currentPlayer}'s turn`;
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function restartGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameStatus.textContent = `${currentPlayer}'s turn`;

        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    // Event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', restartGame);
});
