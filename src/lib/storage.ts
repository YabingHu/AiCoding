import { GameState } from "../types/story";

const storageKey = "shallow-truths-game-state";

export function saveGameState(state: GameState): void {
  window.localStorage.setItem(storageKey, JSON.stringify(state));
}

export function loadGameState(): GameState | null {
  const savedState = window.localStorage.getItem(storageKey);

  if (!savedState) {
    return null;
  }

  try {
    return JSON.parse(savedState) as GameState;
  } catch {
    return null;
  }
}
