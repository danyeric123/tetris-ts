import "./App.css";
import Tetris from "react-tetris";

type GameState = "PLAYING" | "PAUSED" | "LOST";

const keyboardControls = {
  down: "MOVE_DOWN",
  left: "MOVE_LEFT",
  right: "MOVE_RIGHT",
  space: "HARD_DROP",
  z: "FLIP_COUNTERCLOCKWISE",
  x: "FLIP_CLOCKWISE",
  up: "FLIP_CLOCKWISE",
  p: "TOGGLE_PAUSE",
  c: "HOLD",
  shift: "HOLD",
} as const;

const controls = [
  { key: "← →", action: "Move" },
  { key: "↓", action: "Soft drop" },
  { key: "Space", action: "Hard drop" },
  { key: "↑ / X", action: "Rotate CW" },
  { key: "Z", action: "Rotate CCW" },
  { key: "C / Shift", action: "Hold" },
  { key: "P", action: "Pause" },
] as const;

function StateOverlay({
  state,
  points,
  onRestart,
}: {
  state: GameState;
  points: number;
  onRestart: () => void;
}) {
  if (state === "PLAYING") return null;

  return (
    <div className="overlay">
      {state === "LOST" ? (
        <>
          <p>GAME OVER</p>
          <p className="final-score">{points} pts</p>
          <button onClick={onRestart}>Play again</button>
        </>
      ) : (
        <>
          <p>PAUSED</p>
          <p className="pause-hint">press P to resume</p>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <h1>Tetris</h1>
      <Tetris keyboardControls={keyboardControls}>
        {({ Gameboard, PieceQueue, points, linesCleared, state, controller }) => (
          <div className="game-container">
            <div className="game-board-wrapper">
              <Gameboard />
              <StateOverlay
                state={state as GameState}
                points={points}
                onRestart={controller.restart}
              />
            </div>

            <div className="sidebar">
              <div className="stat-block">
                <span className="stat-label">Score</span>
                <span className="stat-value">{points}</span>
              </div>
              <div className="stat-block">
                <span className="stat-label">Lines</span>
                <span className="stat-value">{linesCleared}</span>
              </div>

              <div className="next-piece">
                <span className="stat-label">Next</span>
                <PieceQueue />
              </div>

              <div className="controls-panel">
                <span className="stat-label">Controls</span>
                <ul className="controls-list">
                  {controls.map(({ key, action }) => (
                    <li key={key}>
                      <kbd>{key}</kbd>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="new-game-btn" onClick={controller.restart}>
                New game
              </button>
            </div>
          </div>
        )}
      </Tetris>
    </div>
  );
}

export default App;
