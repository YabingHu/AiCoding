import { describe, expect, it } from "vitest";
import { prologue } from "../content/prologue";
import {
  chooseOption,
  createGameState,
  getCurrentScene,
  lockMemory,
} from "../lib/storyEngine";
import { DialogueOptionId, GameState, MemoryVoice } from "../types/story";

function playDialoguePath(optionIds: DialogueOptionId[]): GameState {
  return optionIds.reduce(
    (state, optionId) => chooseOption(state, optionId),
    createGameState(),
  );
}

const day1PathToMemoryLock: DialogueOptionId[] = [
  "say-good-morning",
  "hold-the-silence",
  "wait-for-an-answer",
  "hallway-repeat-the-story",
  "name-the-agreement",
  "leave-the-key",
  "bus-soften-it",
  "close-it",
  "drop-the-details",
  "argument-repeat-the-story",
  "stairwell-soften-it",
];

function lockDay1Memory(memoryVoice: MemoryVoice): GameState {
  return lockMemory(playDialoguePath(day1PathToMemoryLock), memoryVoice);
}

describe("storyEngine", () => {
  it("keeps the Day 1 content graph internally consistent", () => {
    const sceneEntries = Object.entries(prologue.scenes);
    const allowedStatKeys = new Set(["credibility", "intimacy", "selfCoherence"]);
    let seenLockMemoryEffect = false;

    expect(prologue.startSceneId in prologue.scenes).toBe(true);

    for (const [sceneKey, scene] of sceneEntries) {
      expect(sceneKey).toBe(scene.id);

      for (const option of scene.options) {
        expect(option.nextSceneId in prologue.scenes).toBe(true);

        for (const effect of option.effects ?? []) {
          switch (effect.type) {
            case "stat":
              expect(allowedStatKeys.has(effect.stat)).toBe(true);
              expect(typeof effect.amount).toBe("number");
              break;
            case "lock-memory":
              seenLockMemoryEffect = true;
              expect(effect.key).toBe("day1-roommate-conversation");
              expect(["roommate-denied-it", "i-invented-the-agreement"]).toContain(effect.voice);
              break;
            case "set-day":
              expect(Number.isInteger(effect.day)).toBe(true);
              expect(effect.day).toBeGreaterThanOrEqual(1);
              break;
            default:
              expect.fail(`Unhandled effect type: ${(effect as { type: string }).type}`);
          }
        }
      }
    }

    expect(seenLockMemoryEffect).toBe(true);
  });

  it("starts at the Day 1 morning kitchen scene", () => {
    const state = createGameState();

    expect(state.currentDay).toBe(1);
    expect(state.currentSceneId).toBe("day1-morning-kitchen");
    expect(getCurrentScene(prologue, state)?.id).toBe("day1-morning-kitchen");
  });

  it("moves through the opening choice into the toast smoke scene", () => {
    const nextState = chooseOption(createGameState(), "say-good-morning");

    expect(nextState.currentSceneId).toBe("day1-toast-smoke");
    expect(nextState.stats.intimacy).toBe(1);
  });

  it("can play through the full Day 1 chain into the memory lock scene", () => {
    const stateAtMemoryLock = playDialoguePath(day1PathToMemoryLock);

    expect(stateAtMemoryLock.currentSceneId).toBe("day1-roommate-conversation");
    expect(stateAtMemoryLock.stats).toEqual({
      credibility: 0,
      intimacy: 5,
      selfCoherence: 6,
    });
  });

  it("locks the roommate conversation under the durable memory key", () => {
    const stateAfterChoice = {
      ...createGameState(),
      currentDay: 1,
      currentSceneId: "day1-roommate-conversation" as const,
      lockedMemories: {},
    };
    const nextState = lockMemory(stateAfterChoice, "roommate-denied-it");

    expect(nextState.currentSceneId).toBe("day1-aftermath-roommate-denied-it");
    expect(nextState.lockedMemories["day1-roommate-conversation"]).toBe("roommate-denied-it");
  });

  it("applies distinct stat changes for both Day 1 memory lock outcomes", () => {
    const deniedState = lockDay1Memory("roommate-denied-it");
    const inventedState = lockDay1Memory("i-invented-the-agreement");

    expect(deniedState.currentSceneId).toBe("day1-aftermath-roommate-denied-it");
    expect(deniedState.lockedMemories["day1-roommate-conversation"]).toBe("roommate-denied-it");
    expect(deniedState.stats).toEqual({
      credibility: 1,
      intimacy: 5,
      selfCoherence: 7,
    });

    expect(inventedState.currentSceneId).toBe("day1-aftermath-i-invented-the-agreement");
    expect(inventedState.lockedMemories["day1-roommate-conversation"]).toBe(
      "i-invented-the-agreement",
    );
    expect(inventedState.stats).toEqual({
      credibility: 0,
      intimacy: 6,
      selfCoherence: 7,
    });
  });

  it("rejects chooseOption on a memory scene", () => {
    const memorySceneState = {
      ...createGameState(),
      currentSceneId: "day1-roommate-conversation" as const,
    };

    expect(() =>
      chooseOption(memorySceneState, "say-good-morning"),
    ).toThrow("does not accept dialogue choices");
  });

  it("rejects lockMemory on a dialogue scene", () => {
    expect(() => lockMemory(createGameState(), "roommate-denied-it")).toThrow(
      "does not accept memory locks",
    );
  });

  it("rejects an invalid dialogue option id on a valid dialogue scene", () => {
    expect(() =>
      chooseOption(createGameState(), "not-a-real-option" as never),
    ).toThrow("Unknown dialogue option");
  });
});
