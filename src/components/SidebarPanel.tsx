import { GameState } from "../types/story";

interface SidebarPanelProps {
  state: GameState;
}

const statLabels = [
  { id: "credibility", label: "Credibility" },
  { id: "intimacy", label: "Intimacy" },
  { id: "selfCoherence", label: "Self-coherence" },
] as const;

const lockedMemoryLabels: Record<NonNullable<GameState["memoryVoice"]>, string> = {
  "roommate-denied-it": "He denied it, flatly and without blinking.",
  "i-invented-the-agreement":
    "I invented the agreement because I needed it to be real.",
};

export function SidebarPanel({ state }: SidebarPanelProps) {
  const lockedMemory = state.lockedMemories["day1-roommate-conversation"];
  const lockedMemoryStatus = lockedMemory
    ? lockedMemoryLabels[lockedMemory]
    : "Unarchived";

  return (
    <aside className="sidebar-panel" aria-label="Story state">
      <p className="sidebar-heading">Day {state.currentDay}</p>

      <dl className="stat-list">
        <div className="stat-row">
          <dt>Locked memory</dt>
          <dd>{lockedMemoryStatus}</dd>
        </div>

        {statLabels.map((stat) => (
          <div key={stat.id} className="stat-row">
            <dt>{stat.label}</dt>
            <dd>{state.stats[stat.id]}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
