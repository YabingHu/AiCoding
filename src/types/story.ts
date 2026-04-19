export type SceneId =
  | "opening-conversation"
  | "memory-lock"
  | "aftermath-calm"
  | "aftermath-shaking";

export type DialogueOptionId = "deflect" | "confess-doubt";

export type MemoryVoice = "i_was_calm" | "i_was_shaking";

export interface StoryStats {
  credibility: number;
  intimacy: number;
  selfCoherence: number;
}

export interface DialogueOption {
  id: DialogueOptionId;
  label: string;
}

export interface MemoryOption {
  id: MemoryVoice;
  label: string;
}

interface BaseScene {
  id: SceneId;
  text: string;
}

export interface DialogueScene extends BaseScene {
  type: "dialogue";
  speaker: string;
  options: DialogueOption[];
}

export interface MemoryScene extends BaseScene {
  type: "memory";
  prompt: string;
  options: MemoryOption[];
}

export type StoryScene = DialogueScene | MemoryScene;

export interface StoryContent {
  startSceneId: SceneId;
  scenes: Record<SceneId, StoryScene>;
}

export interface GameState {
  currentSceneId: SceneId;
  stats: StoryStats;
  memoryVoice: MemoryVoice | null;
}
