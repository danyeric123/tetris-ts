import React from 'react';

interface ScoreboardProps {
  score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score}: ScoreboardProps) => {
  return (
    <div className="scoreboard">
      <div>Score: {score}</div>
    </div>
  );
};

export default Scoreboard;
