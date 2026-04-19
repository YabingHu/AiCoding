import { describe, expect, it } from "vitest";
import { prologue } from "../content/prologue";
import {
  chooseOption,
  createGameState,
  getCurrentScene,
  lockMemory,
} from "../lib/storyEngine";

describe("storyEngine", () => {
  it("starts at the opening conversation", () => {
    const state = createGameState();

    expect(state.currentSceneId).toBe("opening-conversation");
    expect(getCurrentScene(prologue, state)?.id).toBe("opening-conversation");
  });

  it("moves to the memory lock after choosing deflect", () => {
    const nextState = chooseOption(createGameState(), "deflect");

    expect(nextState.currentSceneId).toBe("memory-lock");
    expect(nextState.stats.credibility).toBe(1);
    expect(nextState.stats.intimacy).toBe(-1);
  });

  it("tracks intimacy and self coherence when choosing confess-doubt", () => {
    const nextState = chooseOption(createGameState(), "confess-doubt");

    expect(nextState.currentSceneId).toBe("memory-lock");
    expect(nextState.stats.intimacy).toBe(1);
    expect(nextState.stats.selfCoherence).toBe(-1);
  });

  it("moves to the calm aftermath after locking the calm memory", () => {
    const stateAfterChoice = chooseOption(createGameState(), "deflect");
    const nextState = lockMemory(stateAfterChoice, "i_was_calm");

    expect(nextState.currentSceneId).toBe("aftermath-calm");
    expect(nextState.memoryVoice).toBe("i_was_calm");
  });

  it("moves to the shaking aftermath after locking the shaking memory", () => {
    const stateAfterChoice = chooseOption(createGameState(), "confess-doubt");
    const nextState = lockMemory(stateAfterChoice, "i_was_shaking");

    expect(nextState.currentSceneId).toBe("aftermath-shaking");
    expect(nextState.memoryVoice).toBe("i_was_shaking");
  });
});
