import { DialogueOptionId, DialogueScene as DialogueSceneData } from "../types/story";

interface DialogueSceneProps {
  scene: DialogueSceneData;
  onChooseOption: (optionId: DialogueOptionId) => void;
}

export function DialogueScene({
  scene,
  onChooseOption,
}: DialogueSceneProps) {
  return (
    <article className="dialogue-panel" aria-label={`${scene.speaker} dialogue`}>
      <p className="speaker">{scene.speaker}</p>
      <p className="dialogue">{scene.text}</p>

      {scene.options.length > 0 ? (
        <div className="choice-list" aria-label="Dialogue choices">
          {scene.options.map((option) => (
            <button
              key={option.id}
              className="choice-button"
              type="button"
              onClick={() => onChooseOption(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : (
        <p className="scene-status">Memory archived.</p>
      )}
    </article>
  );
}
