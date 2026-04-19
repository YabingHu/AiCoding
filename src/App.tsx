import { useMemo, useState } from "react";
import { DialogueScene } from "./components/DialogueScene";
import { MemoryLockScreen } from "./components/MemoryLockScreen";
import { SidebarPanel } from "./components/SidebarPanel";
import { prologue } from "./content/prologue";
import {
  chooseOption,
  createGameState,
  getCurrentScene,
  lockMemory,
} from "./lib/storyEngine";

function App() {
  const [gameState, setGameState] = useState(() => createGameState());
  const currentScene = useMemo(
    () => getCurrentScene(prologue, gameState),
    [gameState],
  );

  if (!currentScene) {
    return null;
  }

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
