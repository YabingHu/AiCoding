import { beforeEach, describe, expect, it } from "vitest";
import { saveGameState, loadGameState } from "../lib/storage";
import { GameState } from "../types/story";

const savedState: GameState = {
  currentSceneId: "memory-lock",
  stats: {
    credibility: 1,
    intimacy: -1,
    selfCoherence: 0,
  },
  memoryVoice: null,
};

describe("storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns null when there is no saved state", () => {
    expect(loadGameState()).toBeNull();
  });

  it("loads the game state that was previously saved", () => {
    saveGameState(savedState);

    expect(loadGameState()).toEqual(savedState);
  });

  it("returns null for malformed but scene-valid saved state", () => {
    window.localStorage.setItem(
      "shallow-truths-game-state",
      JSON.stringify({
        currentSceneId: "opening-conversation",
        stats: null,
        memoryVoice: null,
      }),
    );

    expect(loadGameState()).toBeNull();
  });
});
