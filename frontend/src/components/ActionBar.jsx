import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faFastForward } from '@fortawesome/free-solid-svg-icons';
import './ActionBar.css';

export default function ActionBar({ selectedWord, onConfirmGuess, disabled, onSkipHint, canSkip }) {
  return (
    <div className="action-bar">
      <button 
        className="action-btn confirm"
        onClick={onConfirmGuess} 
        disabled={disabled || !selectedWord}
      >
        <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '8px' }} />
        Confirmar Palpite
      </button>
      
      {canSkip && (
        <button 
          className="action-btn skip"
          onClick={onSkipHint}
          disabled={disabled}
        >
          <FontAwesomeIcon icon={faFastForward} style={{ marginRight: '8px' }} />
          Pular Dica
        </button>
      )}
    </div>
  );
}
