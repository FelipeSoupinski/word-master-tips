import './Toast.css';

export default function Toast({ message, type }) {
  if (!message) return null;
  
  return (
    <div className={`toast-container toast-${type}`}>
      <span className="toast-icon">
        {type === 'correct' ? '✅' : '❌'}
      </span>
      <span className="toast-message">{message}</span>
    </div>
  );
}
