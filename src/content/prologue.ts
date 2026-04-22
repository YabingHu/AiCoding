import { StoryContent } from "../types/story";

export const prologue: StoryContent = {
  startSceneId: "day1-morning-kitchen",
  scenes: {
    "day1-morning-kitchen": {
      id: "day1-morning-kitchen",
      type: "dialogue",
      speaker: "Mara",
      text: "Morning light lays a bright line across the kitchen table. The mug is still warm, and Jonah is already pretending not to notice the missing spoon.",
      options: [
        {
          id: "say-good-morning",
          label: "Say good morning and let the silence decide.",
          nextSceneId: "day1-toast-smoke",
          effects: [
            { type: "stat", stat: "intimacy", amount: 1 },
          ],
        },
        {
          id: "ask-about-the-mug",
          label: "Ask where he moved the mug last night.",
          nextSceneId: "day1-toast-smoke",
          effects: [
            { type: "stat", stat: "credibility", amount: 1 },
          ],
        },
      ],
    },
    "day1-toast-smoke": {
      id: "day1-toast-smoke",
      type: "dialogue",
      speaker: "Jonah",
      text: "He turns from the stove with a flat, practiced look. The toast smokes on the pan between you, like evidence that nobody wants to claim.",
      options: [
        {
          id: "check-the-fridge",
          label: "Check the fridge for the missing spoon.",
          nextSceneId: "day1-fridge-note",
          effects: [
            { type: "stat", stat: "credibility", amount: 1 },
          ],
        },
        {
          id: "hold-the-silence",
          label: "Hold the silence until he fills it.",
          nextSceneId: "day1-fridge-note",
          effects: [
            { type: "stat", stat: "selfCoherence", amount: 1 },
          ],
        },
      ],
    },
    "day1-fridge-note": {
      id: "day1-fridge-note",
      type: "dialogue",
      speaker: "Mara",
      text: "A note is taped to the fridge door. It is not signed, but it reads like a version of the morning that someone prefers.",
      options: [
        {
          id: "text-the-roommate",
          label: "Text Jonah to confirm the note.",
          nextSceneId: "day1-hallway-pause",
          effects: [
            { type: "stat", stat: "intimacy", amount: 1 },
          ],
        },
        {
          id: "wait-for-an-answer",
          label: "Wait and see whether he admits anything first.",
          nextSceneId: "day1-hallway-pause",
          effects: [
            { type: "stat", stat: "selfCoherence", amount: 1 },
          ],
        },
      ],
    },
    "day1-hallway-pause": {
      id: "day1-hallway-pause",
      type: "dialogue",
      speaker: "Mara",
      text: "The hallway outside the kitchen feels smaller than it did yesterday, as if the apartment has already started taking sides.",
      options: [
        {
          id: "hallway-repeat-the-story",
          label: "Repeat the story back to yourself.",
          nextSceneId: "day1-text-message",
          effects: [
            { type: "stat", stat: "selfCoherence", amount: 1 },
          ],
        },
        {
          id: "hallway-change-the-subject",
          label: "Change the subject before anyone can disagree.",
          nextSceneId: "day1-text-message",
          effects: [
            { type: "stat", stat: "credibility", amount: 1 },
          ],
        },
      ],
    },
    "day1-text-message": {
      id: "day1-text-message",
      type: "dialogue",
      speaker: "Mara",
      text: "Your phone lights up with Jonah's first reply, and it is the sort of answer that only exists because somebody wants the record to stay soft.",
      options: [
        {
          id: "deny-the-agreement",
          label: "Tell him the agreement was never real.",
          nextSceneId: "day1-key-on-table",
          effects: [
            { type: "stat", stat: "credibility", amount: 1 },
          ],
        },
        {
          id: "name-the-agreement",
          label: "Name the agreement out loud, exactly once.",
          nextSceneId: "day1-key-on-table",
          effects: [
            { type: "stat", stat: "intimacy", amount: 1 },
          ],
        },
      ],
    },
    "day1-key-on-table": {
      id: "day1-key-on-table",
      type: "dialogue",
      speaker: "Jonah",
      text: "The spare key is on the table beside the sugar bowl. That placement feels deliberate, like the apartment itself has placed a marker in the conversation.",
      options: [
        {
          id: "take-the-key",
          label: "Take the key before anyone changes their mind.",
          nextSceneId: "day1-bus-platform",
          effects: [
            { type: "stat", stat: "credibility", amount: 1 },
          ],
        },
        {
          id: "leave-the-key",
          label: "Leave the key where it is and wait for him to speak.",
          nextSceneId: "day1-bus-platform",
          effects: [
            { type: "stat", stat: "selfCoherence", amount: 1 },
          ],
        },
      ],
    },
    "day1-bus-platform": {
      id: "day1-bus-platform",
      type: "dialogue",
      speaker: "Mara",
      text: "At the bus platform, the noise of the street makes the memory easier to doubt. Jonah stands half a step away, still looking like someone who expects the story to fold first.",
      options: [
        {
          id: "bus-press-the-facts",
          label: "Press the facts until they stop moving.",
          nextSceneId: "day1-lunch-check-in",
          effects: [
            { type: "stat", stat: "credibility", amount: 1 },
          ],
        },
        {
          id: "bus-soften-it",
          label: "Soften the edge and keep him listening.",
          nextSceneId: "day1-lunch-check-in",
          effects: [
            { type: "stat", stat: "intimacy", amount: 1 },
          ],
        },
      ],
    },
    "day1-lunch-check-in": {
      id: "day1-lunch-check-in",
      type: "dialogue",
      speaker: "Mara",
      text: "By lunch the morning has become a story with clean edges, which means it is already safer than the truth.",
      options: [
        {
          id: "open-the-drawer",
          label: "Open the drawer with the receipts and see what is still there.",
          nextSceneId: "day1-quiet-laundry",
          effects: [
            { type: "stat", stat: "credibility", amount: 1 },
          ],
        },
        {
          id: "close-it",
          label: "Close it before the details can accuse you.",
          nextSceneId: "day1-quiet-laundry",
          effects: [
            { type: "stat", stat: "selfCoherence", amount: 1 },
          ],
        },
      ],
    },
    "day1-quiet-laundry": {
      id: "day1-quiet-laundry",
      type: "dialogue",
      speaker: "Jonah",
      text: "The laundry room is empty except for one broken basket and the sound of a machine that has already forgotten the last cycle.",
      options: [
        {
          id: "count-the-details",
          label: "Count the details until they line up.",
          nextSceneId: "day1-argument-replay",
          effects: [
            { type: "stat", stat: "credibility", amount: 1 },
          ],
        },
        {
          id: "drop-the-details",
          label: "Drop the details and keep the shape of the feeling.",
          nextSceneId: "day1-argument-replay",
          effects: [
            { type: "stat", stat: "intimacy", amount: 1 },
          ],
        },
      ],
    },
    "day1-argument-replay": {
      id: "day1-argument-replay",
      type: "dialogue",
      speaker: "Mara",
      text: "The argument comes back in pieces: the mug, the spoon, the missing promise, the version of Jonah who swore none of it happened.",
      options: [
        {
          id: "argument-repeat-the-story",
          label: "Repeat the version you know by heart.",
          nextSceneId: "day1-stairwell-return",
          effects: [
            { type: "stat", stat: "selfCoherence", amount: 1 },
          ],
        },
        {
          id: "argument-change-the-subject",
          label: "Change the subject and see whether he follows.",
          nextSceneId: "day1-stairwell-return",
          effects: [
            { type: "stat", stat: "intimacy", amount: 1 },
          ],
        },
      ],
    },
    "day1-stairwell-return": {
      id: "day1-stairwell-return",
      type: "dialogue",
      speaker: "Mara",
      text: "On the stairwell landing, Jonah finally says the line you were waiting for, the one that makes the rest of the day feel dangerous.",
      options: [
        {
          id: "stairwell-press-the-facts",
          label: "Press the facts until he has to answer them.",
          nextSceneId: "day1-roommate-conversation",
          effects: [
            { type: "stat", stat: "credibility", amount: 1 },
          ],
        },
        {
          id: "stairwell-soften-it",
          label: "Soften it and give him one more chance to stay honest.",
          nextSceneId: "day1-roommate-conversation",
          effects: [
            { type: "stat", stat: "intimacy", amount: 1 },
          ],
        },
      ],
    },
    "day1-roommate-conversation": {
      id: "day1-roommate-conversation",
      type: "memory",
      text: "The conversation locks into place. Jonah denies it first, and the apartment keeps both versions alive long enough to make choosing impossible.",
      prompt: "Choose which memory voice to lock into the archive.",
      options: [
        {
          id: "roommate-denied-it",
          label: "He denied it, flatly and without blinking.",
          nextSceneId: "day1-aftermath-roommate-denied-it",
          effects: [
            {
              type: "lock-memory",
              key: "day1-roommate-conversation",
              voice: "roommate-denied-it",
            },
            { type: "stat", stat: "credibility", amount: 1 },
            { type: "stat", stat: "selfCoherence", amount: 1 },
          ],
        },
        {
          id: "i-invented-the-agreement",
          label: "I invented the agreement because I needed it to be real.",
          nextSceneId: "day1-aftermath-i-invented-the-agreement",
          effects: [
            {
              type: "lock-memory",
              key: "day1-roommate-conversation",
              voice: "i-invented-the-agreement",
            },
            { type: "stat", stat: "intimacy", amount: 1 },
            { type: "stat", stat: "selfCoherence", amount: 1 },
          ],
        },
      ],
    },
    "day1-aftermath-roommate-denied-it": {
      id: "day1-aftermath-roommate-denied-it",
      type: "dialogue",
      speaker: "Archive Log 01",
      text: "The denial becomes the version that survives the first draft. It is clean, sharp, and wrong in exactly the places that matter.",
      options: [],
    },
    "day1-aftermath-i-invented-the-agreement": {
      id: "day1-aftermath-i-invented-the-agreement",
      type: "dialogue",
      speaker: "Archive Log 01",
      text: "The invented agreement sits in the archive like a fragile truce. It is not true enough to trust, but it is honest about wanting to be.",
      options: [],
    },
  },
};
