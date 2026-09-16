import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './ActionBar.css';

export default function ActionBar({ selectedWord, onConfirmGuess, disabled }) {
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
    </div>
  );
}
