export type SceneId =
  | "day1-morning-kitchen"
  | "day1-toast-smoke"
  | "day1-fridge-note"
  | "day1-hallway-pause"
  | "day1-text-message"
  | "day1-key-on-table"
  | "day1-bus-platform"
  | "day1-lunch-check-in"
  | "day1-quiet-laundry"
  | "day1-argument-replay"
  | "day1-stairwell-return"
  | "day1-roommate-conversation"
  | "day1-aftermath-roommate-denied-it"
  | "day1-aftermath-i-invented-the-agreement";

export type DialogueOptionId =
  | "say-good-morning"
  | "ask-about-the-mug"
  | "check-the-fridge"
  | "hold-the-silence"
  | "text-the-roommate"
  | "wait-for-an-answer"
  | "take-the-key"
  | "leave-the-key"
  | "name-the-agreement"
  | "deny-the-agreement"
  | "hallway-repeat-the-story"
  | "hallway-change-the-subject"
  | "open-the-drawer"
  | "close-it"
  | "count-the-details"
  | "drop-the-details"
  | "bus-press-the-facts"
  | "bus-soften-it"
  | "argument-repeat-the-story"
  | "argument-change-the-subject"
  | "stairwell-press-the-facts"
  | "stairwell-soften-it";

export type MemoryVoice =
  | "roommate-denied-it"
  | "i-invented-the-agreement";

export interface StoryStats {
  credibility: number;
  intimacy: number;
  selfCoherence: number;
}

export type LockedMemoryKey = "day1-roommate-conversation";

export type StoryEffect =
  | {
      type: "stat";
      stat: keyof StoryStats;
      amount: number;
    }
  | {
      type: "lock-memory";
      key: LockedMemoryKey;
      voice: MemoryVoice;
    }
  | {
      type: "set-day";
      day: number;
    };

interface BaseOption<TId extends string> {
  id: TId;
  label: string;
  nextSceneId: SceneId;
  effects?: StoryEffect[];
}

export interface DialogueOption extends BaseOption<DialogueOptionId> {
  id: DialogueOptionId;
}

export interface MemoryOption extends BaseOption<MemoryVoice> {
  id: MemoryVoice;
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

export type LockedMemories = {
  [key in LockedMemoryKey]?: MemoryVoice;
};

export interface GameState {
  currentDay: number;
  currentSceneId: SceneId;
  lockedMemories: LockedMemories;
  stats: StoryStats;
  memoryVoice: MemoryVoice | null;
}
