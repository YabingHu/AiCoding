import { beforeEach, describe, expect, it, vi } from "vitest";
import { saveGameState, loadGameState } from "../lib/storage";
import { GameState } from "../types/story";

const savedState: GameState = {
  currentDay: 1,
  currentSceneId: "day1-roommate-conversation",
  lockedMemories: {},
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

  it("sanitizes malformed locked memories on load", () => {
    window.localStorage.setItem(
      "shallow-truths-game-state",
      JSON.stringify({
        currentDay: 1,
        currentSceneId: "day1-bus-platform",
        lockedMemories: "bad-data",
        stats: {
          credibility: 2,
          intimacy: 1,
          selfCoherence: -1,
        },
        memoryVoice: null,
      }),
    );

    expect(loadGameState()).toEqual({
      currentDay: 1,
      currentSceneId: "day1-bus-platform",
      lockedMemories: {},
      stats: {
        credibility: 2,
        intimacy: 1,
        selfCoherence: -1,
      },
      memoryVoice: null,
    });
  });

  it("preserves a durable locked memory record when loading a valid Day 1 save", () => {
    window.localStorage.setItem(
      "shallow-truths-game-state",
      JSON.stringify({
        currentDay: 1,
        currentSceneId: "day1-aftermath-roommate-denied-it",
        lockedMemories: {
          "day1-roommate-conversation": "roommate-denied-it",
        },
        stats: {
          credibility: 4,
          intimacy: 2,
          selfCoherence: 3,
        },
        memoryVoice: null,
      }),
    );

    expect(loadGameState()).toEqual({
      currentDay: 1,
      currentSceneId: "day1-aftermath-roommate-denied-it",
      lockedMemories: {
        "day1-roommate-conversation": "roommate-denied-it",
      },
      stats: {
        credibility: 4,
        intimacy: 2,
        selfCoherence: 3,
      },
      memoryVoice: null,
    });
  });

  it("returns null for aftermath saves without the required durable lock", () => {
    window.localStorage.setItem(
      "shallow-truths-game-state",
      JSON.stringify({
        currentDay: 1,
        currentSceneId: "day1-aftermath-roommate-denied-it",
        lockedMemories: {},
        stats: {
          credibility: 4,
          intimacy: 2,
          selfCoherence: 3,
        },
        memoryVoice: null,
      }),
    );

    expect(loadGameState()).toBeNull();
  });

  it("returns null for logically impossible durable lock and memory voice combinations", () => {
    window.localStorage.setItem(
      "shallow-truths-game-state",
      JSON.stringify({
        currentDay: 1,
        currentSceneId: "day1-aftermath-roommate-denied-it",
        lockedMemories: {
          "day1-roommate-conversation": "roommate-denied-it",
        },
        stats: {
          credibility: 4,
          intimacy: 2,
          selfCoherence: 3,
        },
        memoryVoice: "i-invented-the-agreement",
      }),
    );

    expect(loadGameState()).toBeNull();
  });

  it("returns null when localStorage getItem throws", () => {
    const getItemSpy = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("storage unavailable");
      });

    expect(loadGameState()).toBeNull();

    getItemSpy.mockRestore();
  });

  it("does not throw when localStorage setItem throws", () => {
    const setItemSpy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("quota exceeded");
      });

    expect(() => saveGameState(savedState)).not.toThrow();

    setItemSpy.mockRestore();
  });

  it("returns null for malformed but scene-valid saved state", () => {
    window.localStorage.setItem(
      "shallow-truths-game-state",
      JSON.stringify({
        currentDay: 1,
        currentSceneId: "day1-morning-kitchen",
        lockedMemories: {},
        stats: null,
        memoryVoice: null,
      }),
    );

    expect(loadGameState()).toBeNull();
  });

  it("returns null for stale saved scene ids", () => {
    window.localStorage.setItem(
      "shallow-truths-game-state",
      JSON.stringify({
        currentDay: 1,
        currentSceneId: "opening-conversation",
        lockedMemories: {},
        stats: {
          credibility: 0,
          intimacy: 0,
          selfCoherence: 0,
        },
        memoryVoice: null,
      }),
    );

    expect(loadGameState()).toBeNull();
  });
});
