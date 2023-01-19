const gameboard = (() => { //gameboard object
  const gameboard = [];
  const displayController = [];
  const displayBoard = document.getElementById('board-display');

  // creating the board
  const createBoard = () => {
    let i = 0;
    while (i < 9) {
      const displayBox = document.createElement('div');
      const para = document.createElement('p');

      displayBox.classList.add('box');
      displayBox.setAttribute('data-index', `${i}`);
      // displayBox.textContent = "X";
      displayBoard.appendChild(displayBox);

      para.textContent = "O";
      displayBox.appendChild(para);
      i++;
    }
  };

  //event listener
  
  

  return {
    createBoard,

  }
})();
gameboard.createBoard();

// factory function to create player
const createPlayer = (player, symbol ) => {
  return {
    player,
    symbol
  };
};

const playerOne = createPlayer('p1', 'X');
const playerTwo = createPlayer('p2', 'O');


