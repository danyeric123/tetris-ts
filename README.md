# Tetris

A Tetris clone built with React, TypeScript, and Vite.

Built in early 2024 as a way to practice TypeScript and have a creative outlet outside of work — back when writing code by hand was still the norm, before agentic programming took over.

Came back to it in 2026 purely for fun, to throw a non-trivial-but-not-huge problem at Claude Sonnet 4.6 and see how well it could oneshot it. The task: add a Framer Motion line-clear animation and migrate the custom CSS sidebar UI to shadcn components. It handled the full plan — Tailwind v4 setup, shadcn CLI, component extraction for hooks compatibility, animation wiring — in a single session with no manual fixups.

## Tech Stack

- **React 18** — UI
- **TypeScript** — type safety
- **Vite** — build tool and dev server
- **react-tetris** — Tetris game engine
- **Tailwind CSS v4** — utility styling
- **shadcn/ui** — component library (Button, Card, Separator)
- **Framer Motion** — line-clear animation + score pop

## Getting Started

```bash
pnpm install
pnpm dev
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
| `pnpm dev`     | Start dev server                    |
| `pnpm build`   | Type-check and build for production |
| `pnpm preview` | Preview production build            |
| `pnpm lint`    | Run ESLint                          |
| `pnpm format`  | Format with Prettier                |
