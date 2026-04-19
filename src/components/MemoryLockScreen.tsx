import { MemoryScene, MemoryVoice } from "../types/story";

interface MemoryLockScreenProps {
  scene: MemoryScene;
  onLockMemory: (memoryVoice: MemoryVoice) => void;
}

export function MemoryLockScreen({
  scene,
  onLockMemory,
}: MemoryLockScreenProps) {
  return (
    <article className="memory-panel" aria-label="Memory lock">
      <p className="memory-label">Memory lock</p>
      <p className="dialogue">{scene.text}</p>
      <p className="memory-prompt">{scene.prompt}</p>

      <div className="choice-list" aria-label="Memory choices">
        {scene.options.map((option) => (
          <button
            key={option.id}
            className="choice-button"
            type="button"
            onClick={() => onLockMemory(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </article>
  );
}
