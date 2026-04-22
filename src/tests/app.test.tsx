import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { loadGameState, saveGameState } from "../lib/storage";

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("routes from the opening Day 1 scene into the next dialogue scene", async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(screen.getByText("Shallow Truths")).toBeInTheDocument();
    expect(screen.getByText("Day 1")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Say good morning and let the silence decide.",
      }),
    );

    expect(
      screen.getByText(
        "He turns from the stove with a flat, practiced look. The toast smokes on the pan between you, like evidence that nobody wants to claim.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Unarchived"),
    ).toBeInTheDocument();
  });

  it("starts from the saved game state when one exists", () => {
    saveGameState({
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
      memoryVoice: "roommate-denied-it",
    });

    render(<App />);

    expect(
      screen.getByText(
        "The denial becomes the version that survives the first draft. It is clean, sharp, and wrong in exactly the places that matter.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("He denied it, flatly and without blinking."),
    ).toBeInTheDocument();
  });

  it("shows the durable locked memory summary even when memoryVoice is null", () => {
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

    render(<App />);

    expect(
      screen.getByText(
        "The denial becomes the version that survives the first draft. It is clean, sharp, and wrong in exactly the places that matter.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("He denied it, flatly and without blinking."),
    ).toBeInTheDocument();
  });

  it("shows the alternate locked memory aftermath when that voice was chosen", () => {
    window.localStorage.setItem(
      "shallow-truths-game-state",
      JSON.stringify({
        currentDay: 1,
        currentSceneId: "day1-aftermath-i-invented-the-agreement",
        lockedMemories: {
          "day1-roommate-conversation": "i-invented-the-agreement",
        },
        stats: {
          credibility: 4,
          intimacy: 2,
          selfCoherence: 3,
        },
        memoryVoice: "i-invented-the-agreement",
      }),
    );

    render(<App />);

    expect(
      screen.getByText(
        "The invented agreement sits in the archive like a fragile truce. It is not true enough to trust, but it is honest about wanting to be.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("I invented the agreement because I needed it to be real."),
    ).toBeInTheDocument();
  });

  it("plays through Day 1 into a locked memory aftermath and persists the stat changes", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Say good morning and let the silence decide.",
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: "Hold the silence until he fills it.",
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: "Wait and see whether he admits anything first.",
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: "Repeat the story back to yourself.",
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: "Name the agreement out loud, exactly once.",
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: "Leave the key where it is and wait for him to speak.",
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: "Soften the edge and keep him listening.",
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: "Close it before the details can accuse you.",
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: "Drop the details and keep the shape of the feeling.",
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: "Repeat the version you know by heart.",
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: "Soften it and give him one more chance to stay honest.",
      }),
    );

    expect(screen.getByText("Memory lock")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "I invented the agreement because I needed it to be real.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Intimacy")).toBeInTheDocument();
    expect(screen.getByText("Self-coherence")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "I invented the agreement because I needed it to be real.",
      }),
    );

    expect(
      screen.getByText(
        "The invented agreement sits in the archive like a fragile truce. It is not true enough to trust, but it is honest about wanting to be.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("I invented the agreement because I needed it to be real."),
    ).toBeInTheDocument();

    expect(loadGameState()).toEqual({
      currentDay: 1,
      currentSceneId: "day1-aftermath-i-invented-the-agreement",
      lockedMemories: {
        "day1-roommate-conversation": "i-invented-the-agreement",
      },
      stats: {
        credibility: 0,
        intimacy: 6,
        selfCoherence: 7,
      },
      memoryVoice: "i-invented-the-agreement",
    });
  });

  it("starts from a fresh Day 1 state when localStorage getItem throws", () => {
    const getItemSpy = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("storage unavailable");
      });

    render(<App />);

    expect(
      screen.getByRole("button", {
        name: "Say good morning and let the silence decide.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Day 1")).toBeInTheDocument();

    getItemSpy.mockRestore();
  });

  it("saves state changes after the player makes a choice", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Ask where he moved the mug last night.",
      }),
    );

    expect(loadGameState()).toEqual({
      currentDay: 1,
      currentSceneId: "day1-toast-smoke",
      lockedMemories: {},
      stats: {
        credibility: 1,
        intimacy: 0,
        selfCoherence: 0,
      },
      memoryVoice: null,
    });
  });

  it("continues the Day 1 flow when localStorage setItem throws after a choice", async () => {
    const user = userEvent.setup();
    const setItemSpy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("quota exceeded");
      });

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Ask where he moved the mug last night.",
      }),
    );

    expect(
      screen.getByText(
        "He turns from the stove with a flat, practiced look. The toast smokes on the pan between you, like evidence that nobody wants to claim.",
      ),
    ).toBeInTheDocument();

    setItemSpy.mockRestore();
  });

  it("recovers to a fresh game when the saved scene id is invalid", () => {
    window.localStorage.setItem(
      "shallow-truths-game-state",
      JSON.stringify({
        currentDay: 1,
        currentSceneId: "missing-scene",
        lockedMemories: {},
        stats: {
          credibility: 3,
          intimacy: 2,
          selfCoherence: -4,
        },
        memoryVoice: null,
      }),
    );

    render(<App />);

    expect(
      screen.getByRole("button", {
        name: "Say good morning and let the silence decide.",
      }),
    ).toBeInTheDocument();
    expect(loadGameState()).toEqual({
      currentDay: 1,
      currentSceneId: "day1-morning-kitchen",
      lockedMemories: {},
      stats: {
        credibility: 0,
        intimacy: 0,
        selfCoherence: 0,
      },
      memoryVoice: null,
    });
  });
});
