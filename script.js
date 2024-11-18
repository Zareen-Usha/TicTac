document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("gameBoard");
  const statusMessage = document.getElementById("statusMessage");
  const restartButton = document.getElementById("restartButton");
  
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;

  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],            // Diagonals
  ];

  const checkWinner = () => {
    let roundWon = false;
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      statusMessage.textContent = `Player ${currentPlayer} Wins!`;
      isGameActive = false;
      return true;
    }

    if (!board.includes("")) {
      statusMessage.textContent = "It's a Draw!";
      isGameActive = false;
      return true;
    }

    return false;
  };

  const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute("data-index"));

    if (board[cellIndex] !== "" || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (!checkWinner()) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
    }
  };

  const restartGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusMessage.textContent = "Player X's Turn";
    gameBoard.innerHTML = "";
    createBoard();
  };

  const createBoard = () => {
    board.forEach((_, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-index", index);
      cell.addEventListener("click", handleCellClick);
      gameBoard.appendChild(cell);
    });
  };

  createBoard();
  restartButton.addEventListener("click", restartGame);
});
