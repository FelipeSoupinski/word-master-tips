import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './GameLog.css';

export default function GameLog({ logEntries }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logEntries]);

  return (
    <div className="hint-card side-card log-card">
      <h3 className="hint-card-title log-title">Histórico</h3>
      <div className="log-container" ref={containerRef}>
        {logEntries && logEntries.length > 0 ? (
          logEntries.map((entry, idx) => (
            <div key={idx} className={`log-entry ${entry.type}`} title={entry.text}>
              <span className="log-icon">
                {entry.type === 'master' && <FontAwesomeIcon icon={faBrain} />}
                {entry.type === 'correct' && <FontAwesomeIcon icon={faCheck} />}
                {entry.type === 'wrong' && <FontAwesomeIcon icon={faTimes} />}
              </span>
              <span className="log-text">{entry.text}</span>
            </div>
          ))
        ) : (
          <div className="log-empty">Nenhum evento ainda...</div>
        )}
      </div>
    </div>
  );
}
