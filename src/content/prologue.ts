import { StoryContent } from "../types/story";

export const prologue: StoryContent = {
  startSceneId: "opening-conversation",
  scenes: {
    "opening-conversation": {
      id: "opening-conversation",
      type: "dialogue",
      speaker: "Archive Log 01",
      text: "The sea keeps immaculate records. Every whisper returns eventually, polished into something that sounds like memory.",
      options: [
        { id: "deflect", label: "Deflect with a practiced smile." },
        { id: "confess-doubt", label: "Admit the story is slipping." },
      ],
    },
    "memory-lock": {
      id: "memory-lock",
      type: "memory",
      text: "The room tilts around the missing detail until only one version of you feels survivable.",
      prompt: "Choose the feeling you decide to preserve.",
      options: [
        { id: "i_was_calm", label: "I was calm." },
        { id: "i_was_shaking", label: "I was shaking." },
      ],
    },
    "aftermath-calm": {
      id: "aftermath-calm",
      type: "dialogue",
      speaker: "Archive Log 01",
      text: "You smooth the moment flat and call it composure. The lie settles into the archive like it belongs there.",
      options: [],
    },
    "aftermath-shaking": {
      id: "aftermath-shaking",
      type: "dialogue",
      speaker: "Archive Log 01",
      text: "You leave the tremor in place. The record breathes harder, but it sounds a little more like you.",
      options: [],
    },
  },
};
