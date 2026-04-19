import {
  DialogueOptionId,
  GameState,
  MemoryVoice,
  StoryContent,
  StoryScene,
} from "../types/story";

const initialStats = {
  credibility: 0,
  intimacy: 0,
  selfCoherence: 0,
};

export function createGameState(): GameState {
  return {
    currentSceneId: "opening-conversation",
    stats: { ...initialStats },
    memoryVoice: null,
  };
}

export function getCurrentScene(
  content: StoryContent,
  state: GameState,
): StoryScene | undefined {
  return content.scenes[state.currentSceneId];
}

export function chooseOption(
  state: GameState,
  optionId: DialogueOptionId,
): GameState {
  if (optionId === "deflect") {
    return {
      ...state,
      currentSceneId: "memory-lock",
      stats: {
        ...state.stats,
        credibility: state.stats.credibility + 1,
        intimacy: state.stats.intimacy - 1,
      },
    };
  }

  return {
    ...state,
    currentSceneId: "memory-lock",
    stats: {
      ...state.stats,
      intimacy: state.stats.intimacy + 1,
      selfCoherence: state.stats.selfCoherence - 1,
    },
  };
}

export function lockMemory(state: GameState, memoryVoice: MemoryVoice): GameState {
  return {
    ...state,
    currentSceneId:
      memoryVoice === "i_was_calm" ? "aftermath-calm" : "aftermath-shaking",
    memoryVoice,
  };
}
