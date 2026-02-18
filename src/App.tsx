import "./App.css";
import { useEffect, useRef } from "react";
import Tetris from "react-tetris";
import type { Controller } from "react-tetris/lib/components/Tetris";
import type { ComponentType } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/88"
      style={{ fontFamily: "'Press Start 2P', cursive" }}>
      {state === "LOST" ? (
        <>
          <p className="m-0 text-lg text-primary" style={{ textShadow: "0 0 8px oklch(0.925 0.12 155)" }}>
            GAME OVER
          </p>
          <p className="m-0 text-[0.6rem] text-white">{points} pts</p>
          <Button
            variant="outline"
            onClick={onRestart}
            className="mt-2 border-primary text-primary text-[0.55rem] hover:bg-primary hover:text-black"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            Play again
          </Button>
        </>
      ) : (
        <>
          <p className="m-0 text-lg text-primary" style={{ textShadow: "0 0 8px oklch(0.925 0.12 155)" }}>
            PAUSED
          </p>
          <p className="m-0 text-[0.45rem] text-muted-foreground">press P to resume</p>
        </>
      )}
    </div>
  );
}

interface GameContentProps {
  Gameboard: ComponentType;
  points: number;
  linesCleared: number;
  state: GameState;
  controller: Controller;
}

function GameContent({ Gameboard, points, linesCleared, state, controller }: GameContentProps) {
  const boardControls = useAnimation();
  const prevLines = useRef(linesCleared);

  useEffect(() => {
    if (linesCleared > prevLines.current) {
      boardControls.start({
        scale: [1, 1.03, 1],
        boxShadow: [
          "0 0 0px oklch(0.925 0.12 155 / 0)",
          "0 0 40px oklch(0.925 0.12 155 / 0.8)",
          "0 0 0px oklch(0.925 0.12 155 / 0)",
        ],
        transition: { duration: 0.45, ease: "easeOut" },
      });
    }
    prevLines.current = linesCleared;
  }, [linesCleared, boardControls]);

  return (
    <div className="flex gap-6 items-start">
      {/* Board */}
      <motion.div animate={boardControls} className="relative">
        <Gameboard />
        <StateOverlay state={state} points={points} onRestart={controller.restart} />
      </motion.div>

      {/* Sidebar */}
      <Card className="min-w-[148px] gap-0 py-4 border-border">
        <CardContent className="flex flex-col gap-4 px-4">
          {/* Score */}
          <div className="flex flex-col gap-1">
            <span
              className="text-[0.45rem] uppercase tracking-widest text-muted-foreground"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              Score
            </span>
            <motion.span
              key={points}
              initial={{ scale: 1.3, color: "oklch(1 0 0)" }}
              animate={{ scale: 1, color: "oklch(0.925 0.12 155)" }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="text-lg text-primary"
              style={{ fontFamily: "'Press Start 2P', cursive", display: "inline-block" }}
            >
              {points}
            </motion.span>
          </div>

          {/* Lines */}
          <div className="flex flex-col gap-1">
            <span
              className="text-[0.45rem] uppercase tracking-widest text-muted-foreground"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              Lines
            </span>
            <span
              className="text-lg text-primary"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              {linesCleared}
            </span>
          </div>

          <Separator className="bg-border" />

          {/* Controls */}
          <div className="flex flex-col gap-2">
            <span
              className="text-[0.45rem] uppercase tracking-widest text-muted-foreground"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              Controls
            </span>
            <ul className="list-none p-0 m-0 flex flex-col gap-[0.4rem]">
              {controls.map(({ key, action }) => (
                <li key={key} className="flex items-center justify-between gap-2 text-[0.38rem] text-foreground/80"
                  style={{ fontFamily: "'Press Start 2P', cursive" }}>
                  <kbd className="bg-secondary border border-border rounded px-[0.4em] py-[0.2em] text-primary whitespace-nowrap">
                    {key}
                  </kbd>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator className="bg-border" />

          {/* New game */}
          <Button
            variant="outline"
            size="sm"
            onClick={controller.restart}
            className="border-primary text-primary text-[0.4rem] hover:bg-primary hover:text-black w-full"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            New game
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-background">
      <h1
        className="mb-6 text-3xl tracking-wider"
        style={{
          fontFamily: "'Press Start 2P', cursive",
          color: "oklch(0.925 0.12 155)",
          textShadow: "0 0 12px oklch(0.925 0.12 155)",
        }}
      >
        Tetris
      </h1>
      <Tetris keyboardControls={keyboardControls}>
        {({ Gameboard, points, linesCleared, state, controller }) => (
          <GameContent
            Gameboard={Gameboard}
            points={points}
            linesCleared={linesCleared}
            state={state as GameState}
            controller={controller}
          />
        )}
      </Tetris>
    </div>
  );
}

export default App;
