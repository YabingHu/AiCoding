import { GameState } from "../types/story";

interface SidebarPanelProps {
  state: GameState;
}

const statLabels = [
  { id: "credibility", label: "Credibility" },
  { id: "intimacy", label: "Intimacy" },
  { id: "selfCoherence", label: "Self-coherence" },
] as const;

export function SidebarPanel({ state }: SidebarPanelProps) {
  return (
    <aside className="sidebar-panel" aria-label="Story state">
      <p className="sidebar-heading">Current profile</p>

      <dl className="stat-list">
        {statLabels.map((stat) => (
          <div key={stat.id} className="stat-row">
            <dt>{stat.label}</dt>
            <dd>{state.stats[stat.id]}</dd>
          </div>
        ))}

        <div className="stat-row">
          <dt>Locked memory</dt>
          <dd>{state.memoryVoice ?? "None"}</dd>
        </div>
      </dl>
    </aside>
  );
}
