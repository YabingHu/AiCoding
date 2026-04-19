import { useEffect, useMemo, useState } from "react";
import { DialogueScene } from "./components/DialogueScene";
import { MemoryLockScreen } from "./components/MemoryLockScreen";
import { SidebarPanel } from "./components/SidebarPanel";
import { prologue } from "./content/prologue";
import { loadGameState, saveGameState } from "./lib/storage";
import {
  chooseOption,
  createGameState,
  getCurrentScene,
  lockMemory,
} from "./lib/storyEngine";
import { GameState, StoryScene } from "./types/story";

function createFreshGameState(): GameState {
  return createGameState();
}

function getResolvedGameState(state: GameState | null): GameState {
  if (state && getCurrentScene(prologue, state)) {
    return state;
  }

  return createFreshGameState();
}

function getResolvedScene(state: GameState): StoryScene {
  return getCurrentScene(prologue, state) ?? prologue.scenes[prologue.startSceneId];
}

function App() {
  const [gameState, setGameState] = useState(() =>
    getResolvedGameState(loadGameState()),
  );
  const currentScene = useMemo(
    () => getResolvedScene(gameState),
    [gameState],
  );

  useEffect(() => {
    if (!getCurrentScene(prologue, gameState)) {
      setGameState(createFreshGameState());
      return;
    }

    saveGameState(gameState);
  }, [gameState]);

  return (
    <main className="app-shell">
      <section className="scene-frame" aria-label="Visual novel scene">
        <div className="scene-backdrop" aria-hidden="true" />
        <header className="title-lockup">
          <p className="kicker">Interactive prologue</p>
          <h1>Shallow Truths</h1>
        </header>

        <div className="scene-content">
          {currentScene.type === "dialogue" ? (
            <DialogueScene
              scene={currentScene}
              onChooseOption={(optionId) =>
                setGameState((state) => chooseOption(state, optionId))
              }
            />
          ) : (
            <MemoryLockScreen
              scene={currentScene}
              onLockMemory={(memoryVoice) =>
                setGameState((state) => lockMemory(state, memoryVoice))
              }
            />
          )}

          <SidebarPanel state={gameState} />
        </div>
      </section>
    </main>
  );
}

export default App;
