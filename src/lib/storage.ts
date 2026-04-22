import { prologue } from "../content/prologue";
import { GameState, MemoryVoice, SceneId, StoryStats } from "../types/story";

const storageKey = "shallow-truths-game-state";

const validSceneIds = new Set<SceneId>(Object.keys(prologue.scenes) as SceneId[]);
const validMemoryVoices = new Set<MemoryVoice>([
  "roommate-denied-it",
  "i-invented-the-agreement",
]);
const aftermathSceneVoiceById: Partial<Record<SceneId, MemoryVoice>> = {
  "day1-aftermath-roommate-denied-it": "roommate-denied-it",
  "day1-aftermath-i-invented-the-agreement": "i-invented-the-agreement",
};

function isValidSceneId(value: unknown): value is SceneId {
  return typeof value === "string" && validSceneIds.has(value as SceneId);
}

function isValidMemoryVoice(value: unknown): value is MemoryVoice {
  return typeof value === "string" && validMemoryVoices.has(value as MemoryVoice);
}

function isValidStats(value: unknown): value is StoryStats {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const stats = value as Record<string, unknown>;

  return (
    typeof stats.credibility === "number" &&
    Number.isFinite(stats.credibility) &&
    typeof stats.intimacy === "number" &&
    Number.isFinite(stats.intimacy) &&
    typeof stats.selfCoherence === "number" &&
    Number.isFinite(stats.selfCoherence)
  );
}

function parseLockedMemories(value: unknown): GameState["lockedMemories"] {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return {};
  }

  const lockedMemories = value as Record<string, unknown>;
  const roommateConversation = lockedMemories["day1-roommate-conversation"];

  if (!isValidMemoryVoice(roommateConversation)) {
    return {};
  }

  return {
    "day1-roommate-conversation": roommateConversation,
  };
}

function parseGameState(value: unknown): GameState | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const state = value as Record<string, unknown>;
  const currentDay = state.currentDay;
  const currentSceneId = state.currentSceneId;
  const stats = state.stats;
  const memoryVoice = state.memoryVoice;

  if (
    typeof currentDay !== "number" ||
    !Number.isFinite(currentDay) ||
    !Number.isInteger(currentDay) ||
    currentDay < 1 ||
    !isValidSceneId(currentSceneId) ||
    !isValidStats(stats) ||
    !(memoryVoice === null || isValidMemoryVoice(memoryVoice))
  ) {
    return null;
  }

  const lockedMemories = parseLockedMemories(state.lockedMemories);
  const durableRoommateConversation =
    lockedMemories["day1-roommate-conversation"];
  const requiredAftermathVoice = aftermathSceneVoiceById[currentSceneId];

  if (
    (memoryVoice !== null &&
      durableRoommateConversation !== undefined &&
      memoryVoice !== durableRoommateConversation) ||
    (requiredAftermathVoice !== undefined &&
      durableRoommateConversation !== requiredAftermathVoice) ||
    (requiredAftermathVoice !== undefined &&
      memoryVoice !== null &&
      memoryVoice !== requiredAftermathVoice)
  ) {
    return null;
  }

  return {
    currentDay,
    currentSceneId,
    lockedMemories,
    stats,
    memoryVoice,
  };
}

export function saveGameState(state: GameState): void {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // Ignore storage failures so UI state can continue in memory.
  }
}

export function loadGameState(): GameState | null {
  let savedState: string | null;

  try {
    savedState = window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }

  if (!savedState) {
    return null;
  }

  try {
    const parsed = JSON.parse(savedState) as unknown;

    return parseGameState(parsed);
  } catch {
    return null;
  }
}
