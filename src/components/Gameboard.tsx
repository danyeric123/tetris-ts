import React from 'react';

interface GameBoardProps {
  grid: number[][];
}

type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const GameBoard: React.FC<GameBoardProps> = ({ grid }) => {
  return (
    <div className="game-board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className={`cell ${valueStyleMap[cell as CellValue]}`} />
          ))}
        </div>
      ))}
    </div>
  );
};

const valueStyleMap = {
  0: 'empty',
  1: 'shape-i',
  2: 'shape-j',
  3: 'shape-l',
  4: 'shape-o',
  5: 'shape-s',
  6: 'shape-t',
  7: 'shape-z',
};

export default GameBoard;
