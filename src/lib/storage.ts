import { GameState } from "../types/story";

const storageKey = "shallow-truths-game-state";

function isGameState(value: unknown): value is GameState {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const state = value as Record<string, unknown>;
  const stats = state.stats as Record<string, unknown> | null | undefined;

  return (
    (state.currentSceneId === "opening-conversation" ||
      state.currentSceneId === "memory-lock" ||
      state.currentSceneId === "aftermath-calm" ||
      state.currentSceneId === "aftermath-shaking") &&
    typeof stats === "object" &&
    stats !== null &&
    typeof stats.credibility === "number" &&
    typeof stats.intimacy === "number" &&
    typeof stats.selfCoherence === "number" &&
    (state.memoryVoice === null ||
      state.memoryVoice === "i_was_calm" ||
      state.memoryVoice === "i_was_shaking")
  );
}

export function saveGameState(state: GameState): void {
  window.localStorage.setItem(storageKey, JSON.stringify(state));
}

export function loadGameState(): GameState | null {
  const savedState = window.localStorage.getItem(storageKey);

  if (!savedState) {
    return null;
  }

  try {
    const parsed = JSON.parse(savedState) as unknown;

    return isGameState(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
