import {
  DialogueOptionId,
  GameState,
  MemoryVoice,
  StoryEffect,
  StoryContent,
  StoryScene,
} from "../types/story";
import { prologue } from "../content/prologue";

const initialStats = {
  credibility: 0,
  intimacy: 0,
  selfCoherence: 0,
};

export function createGameState(): GameState {
  return createGameStateForContent(prologue);
}

function createGameStateForContent(
  content: StoryContent,
): GameState {
  return {
    currentDay: 1,
    currentSceneId: content.startSceneId,
    lockedMemories: {},
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

function applyEffects(state: GameState, effects?: StoryEffect[]): GameState {
  const nextState: GameState = {
    ...state,
    stats: { ...state.stats },
    lockedMemories: { ...state.lockedMemories },
  };

  for (const effect of effects ?? []) {
    switch (effect.type) {
      case "stat":
        nextState.stats = {
          ...nextState.stats,
          [effect.stat]: nextState.stats[effect.stat] + effect.amount,
        };
        break;
      case "lock-memory":
        nextState.lockedMemories = {
          ...nextState.lockedMemories,
          [effect.key]: effect.voice,
        };
        nextState.memoryVoice = effect.voice;
        break;
      case "set-day":
        nextState.currentDay = effect.day;
        break;
      default:
        assertNever(effect);
    }
  }

  return nextState;
}

function assertNever(value: never): never {
  throw new Error(`Unhandled effect type: ${JSON.stringify(value)}`);
}

export function chooseOption(
  state: GameState,
  optionId: DialogueOptionId,
  content: StoryContent = prologue,
): GameState {
  const scene = getCurrentScene(content, state);

  if (!scene) {
    throw new Error(`Unknown scene: ${state.currentSceneId}`);
  }

  if (scene.type !== "dialogue") {
    throw new Error(`Scene ${scene.id} does not accept dialogue choices`);
  }

  const option = scene.options.find((choice) => choice.id === optionId);

  if (!option) {
    throw new Error(
      `Unknown dialogue option ${optionId} in scene ${scene.id}`,
    );
  }

  return {
    ...applyEffects(state, option.effects),
    currentSceneId: option.nextSceneId,
  };
}

export function lockMemory(
  state: GameState,
  memoryVoice: MemoryVoice,
  content: StoryContent = prologue,
): GameState {
  const scene = getCurrentScene(content, state);

  if (!scene) {
    throw new Error(`Unknown scene: ${state.currentSceneId}`);
  }

  if (scene.type !== "memory") {
    throw new Error(`Scene ${scene.id} does not accept memory locks`);
  }

  const option = scene.options.find((choice) => choice.id === memoryVoice);

  if (!option) {
    throw new Error(
      `Unknown memory option ${memoryVoice} in scene ${scene.id}`,
    );
  }

  return {
    ...applyEffects(state, option.effects),
    currentSceneId: option.nextSceneId,
  };
}
