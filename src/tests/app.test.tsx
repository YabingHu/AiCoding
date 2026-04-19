import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import App from "../App";
import { loadGameState, saveGameState } from "../lib/storage";

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("routes from dialogue to memory lock and then to the calm aftermath", async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(screen.getByText("Shallow Truths")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Deflect with a practiced smile.",
      }),
    );

    expect(
      screen.getByText("Choose the feeling you decide to preserve."),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "I was calm." }));

    expect(
      screen.getByText(
        "You smooth the moment flat and call it composure. The lie settles into the archive like it belongs there.",
      ),
    ).toBeInTheDocument();
  });

  it("starts from the saved game state when one exists", () => {
    saveGameState({
      currentSceneId: "aftermath-calm",
      stats: {
        credibility: 1,
        intimacy: -1,
        selfCoherence: 0,
      },
      memoryVoice: "i_was_calm",
    });

    render(<App />);

    expect(
      screen.getByText(
        "You smooth the moment flat and call it composure. The lie settles into the archive like it belongs there.",
      ),
    ).toBeInTheDocument();
  });

  it("saves state changes after the player makes a choice", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Deflect with a practiced smile.",
      }),
    );

    expect(loadGameState()).toEqual({
      currentSceneId: "memory-lock",
      stats: {
        credibility: 1,
        intimacy: -1,
        selfCoherence: 0,
      },
      memoryVoice: null,
    });
  });

  it("recovers to a fresh game when the saved scene id is invalid", () => {
    window.localStorage.setItem(
      "shallow-truths-game-state",
      JSON.stringify({
        currentSceneId: "missing-scene",
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
        name: "Deflect with a practiced smile.",
      }),
    ).toBeInTheDocument();
    expect(loadGameState()).toEqual({
      currentSceneId: "opening-conversation",
      stats: {
        credibility: 0,
        intimacy: 0,
        selfCoherence: 0,
      },
      memoryVoice: null,
    });
  });
});
