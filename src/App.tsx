function App() {
  return (
    <main className="app-shell">
      <section className="scene-frame" aria-label="Visual novel scene">
        <div className="scene-backdrop" aria-hidden="true" />
        <header className="title-lockup">
          <p className="kicker">Interactive prologue</p>
          <h1>Shallow Truths</h1>
        </header>

        <article className="dialogue-panel" aria-label="Opening narration">
          <p className="speaker">Archive Log 01</p>
          <p className="dialogue">
            The sea keeps immaculate records. Every whisper returns eventually,
            polished into something that sounds like memory.
          </p>

          <button className="continue-button" type="button">
            Continue
          </button>
        </article>
      </section>
    </main>
  );
}

export default App;
