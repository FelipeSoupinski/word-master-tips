import React from 'react';
import './Mascot.css';

export default function Mascot({ animationState, message }) {
  return (
    <div className={`mascot-container ${animationState}`}>
      {message && (
        <div className="speech-bubble">
          {message}
        </div>
      )}
      <div className="mascot-sprite">
        <img src="/mascot.png" alt="Mascote" className="mascot-img" />
      </div>
    </div>
  );
}
