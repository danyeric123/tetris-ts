# Tetris

A Tetris clone built with React, TypeScript, and Vite.

Built in early 2024 as a way to practice TypeScript and have a creative outlet outside of work — back when writing code by hand was still the norm, before agentic programming took over.

## Tech Stack

- **React 18** — UI
- **TypeScript** — type safety
- **Vite** — build tool and dev server
- **react-tetris** — Tetris game engine
- **react-modal** — modal dialogs

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Controls

| Key        | Action                   |
| ---------- | ------------------------ |
| ← →        | Move left / right        |
| ↓          | Soft drop                |
| Space      | Hard drop                |
| ↑ or X     | Rotate clockwise         |
| Z          | Rotate counter-clockwise |
| C or Shift | Hold piece               |
| P          | Pause / resume           |

## Scripts

| Command        | Description                         |
| -------------- | ----------------------------------- |
| `yarn dev`     | Start dev server                    |
| `yarn build`   | Type-check and build for production |
| `yarn preview` | Preview production build            |
| `yarn lint`    | Run ESLint                          |
