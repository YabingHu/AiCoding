import { prologue } from "./content/prologue";

function App() {
  const openingScene = prologue.scenes[prologue.startSceneId];
  const openingSpeaker =
    openingScene.type === "dialogue" ? openingScene.speaker : "Archive Log 01";

  return (
    <main className="app-shell">
      <section className="scene-frame" aria-label="Visual novel scene">
        <div className="scene-backdrop" aria-hidden="true" />
        <header className="title-lockup">
          <p className="kicker">Interactive prologue</p>
          <h1>Shallow Truths</h1>
        </header>

        <article className="dialogue-panel" aria-label="Opening narration">
          <p className="speaker">{openingSpeaker}</p>
          <p className="dialogue">{openingScene.text}</p>

          <button className="continue-button" type="button">
            Continue
          </button>
        </article>
      </section>
    </main>
  );
}

export default App;
