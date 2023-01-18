const gameboard = () => {
  const gameboard = [];

}

const createPlayer = (player, symbol ) => {
  return {
    player,
    symbol
  };
};

const playerOne = createPlayer('p1', 'X');
const playerTwo = createPlayer('p2', 'O');
