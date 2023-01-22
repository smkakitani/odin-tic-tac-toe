// factory function to create player
const createPlayer = (player, mark) => {
  return {
    player,
    mark,
  }
};

// module gameBoard
const gameBoard = (() => {
  const board = Array(9).fill("", 0);
  let running = false;

  const changeRunning = () => {
    running = (running == false) ? true : false;
  };

  const getRunning = () => running;  

  const createBoard = () => {
    const boardDisplay = document.getElementById("board-display");
    running = true;
    game.displayTurn();

    let i = 0;
    while (i < board.length) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute('data-index', `${i}`);
      cell.textContent = `${board[i]}`;
      boardDisplay.appendChild(cell);
      i++;
    }
  };

  const showBoard = () => createBoard();

  const setBoard = (index, mark) => {
    board[index] = mark;
  };

  const resetBoard = () => {
    running = true;
    game.displayTurn();

    let i = 0;
    while (i < board.length) {
      board[i] = "";
      i++;
    };
    document.querySelectorAll(".cell").forEach((element) => {
      element.textContent = "";
    });
    
  };

  return {
    setBoard,
    resetBoard,
    getRunning,
    changeRunning,
    showBoard,
    board,
  }
})();

// module displayController
const displayController = (() => {
  const boardDisplay = document.getElementById("board-display");
  const resetButton = document.getElementById("container-players");

  const getIndexBoard = () => {
    boardDisplay.addEventListener("click", (event) => {
      const eventIndex = event.target.dataset.index;
      const eventText = event.target.textContent;

      if (eventText !== "" || !gameBoard.getRunning()) {
        console.log("you can't do it!!", gameBoard.getRunning());        
        return;
      } else {
        gameBoard.setBoard(eventIndex, game.getCurrentPlayer());
        event.target.textContent = `${gameBoard.board[eventIndex]}`;
        game.checkWinner();
        game.changePlayer();
        game.displayTurn();
      }
    });
  };

  const clickResetButton = () => {
    resetButton.addEventListener("click", (event) => {
      gameBoard.resetBoard();
      // console.log("resetting board");
    });
  };

  const clickEvents = () => {
    getIndexBoard();
    clickResetButton();
  };
  
  return {
    clickEvents,
  }
})();

// module of the game 
const game = (() => {
  const player1 = createPlayer("p1", "X");
  const player2 = createPlayer("p2", "O");
  const playerDisplay = document.getElementById("player-mark");
  let currentPlayer = player1.mark; // keep active player, show players with function getCurrentPlayer()

  const changePlayer = () => {
    currentPlayer = (currentPlayer == player1.mark) ? player2.mark : player1.mark;
    console.log(currentPlayer);
  };

  const getCurrentPlayer = () => {
    return currentPlayer
  };
  
  const winConditions = [
    //lines
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      const comboA = gameBoard.board[condition[0]];
      const comboB = gameBoard.board[condition[1]];
      const comboC = gameBoard.board[condition[2]];

      if(comboA === "" || comboB === "" || comboC === "") {
        continue;
      } else if (comboA == comboB && comboB == comboC) {
        roundWon = true;
        // console.log('roundwon is true');
        break;
      }
    }

    if (roundWon) {
      // console.log(`${getCurrentPlayer()} wins!`);
      playerDisplay.textContent = `${getCurrentPlayer()} wins!`;
      gameBoard.changeRunning();
      // console.log(`running = ${gameBoard.getRunning()}`);
    } else if (!gameBoard.board.includes("")) {
      // console.log("DRAW");
      playerDisplay.textContent = `Draw!`;
      gameBoard.changeRunning();
    } else {
      // changePlayer();
    }
  };  

  const displayTurn = () => {
    const playerDisplay = document.getElementById("player-mark");
    if (gameBoard.getRunning()) {
      playerDisplay.textContent = `Player ${currentPlayer} turn`;
    }    
  };
  // console.log(currentPlayer);
  return {
    changePlayer,
    getCurrentPlayer,
    checkWinner,
    displayTurn,
  }
})();

gameBoard.showBoard();
displayController.clickEvents();