import "./App.css";
import Tetris from "react-tetris";

function App(): JSX.Element {
  return (
    <>
      <h1>Tetris</h1>
      <Tetris
        keyboardControls={{
          // Default values shown here. These will be used if no
          // `keyboardControls` prop is provided.
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
        }}
      >
        {({ Gameboard, points, linesCleared, controller }) => (
          <div>
            <div>
              <p>Points: {points}</p>
              <p>Lines Cleared: {linesCleared}</p>
              <button onClick={controller.restart}>New game</button>
            </div>
            <Gameboard />
          </div>
        )}
      </Tetris>
    </>
  );
}

export default App;
