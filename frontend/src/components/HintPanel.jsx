import './HintPanel.css';

export default function HintPanel({ currentHint, currentTargets }) {
  if (currentHint) {
    return (
      <div className="hint-panel">
        <div className="hint-label">A Dica é:</div>
        <div className="hint-word">{currentHint}</div>
        <div className="hint-targets">Encontre <strong>{currentTargets}</strong> carta{currentTargets > 1 ? 's' : ''}</div>
      </div>
    );
  }

  return (
    <div className="hint-panel">
      <div className="hint-label">Aguardando Mestre...</div>
    </div>
  );
}
