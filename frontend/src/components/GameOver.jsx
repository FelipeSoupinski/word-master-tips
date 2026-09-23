import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSkull, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { processor } from '../services/gameProcessor';
import './GameOver.css';

export default function GameOver({ result, onPlayAgain, lives, campaignId, levelId, elapsedTime, bestTime }) {
  const isVictory = result === 'victory';
  const navigate = useNavigate();
  
  // Find next level if any
  let nextLevelId = null;
  if (campaignId !== undefined && levelId !== undefined) {
    const parsedCampaignId = parseInt(campaignId, 10);
    const parsedLevelId = parseInt(levelId, 10);
    const levels = processor.getLevelsForGame(parsedCampaignId);
    const currentIndex = levels.findIndex(l => l.id === parsedLevelId);
    if (currentIndex >= 0 && currentIndex < levels.length - 1) {
      nextLevelId = levels[currentIndex + 1].id;
    }
  }

  const formatTime = (totalSeconds) => {
    if (totalSeconds === null || totalSeconds === undefined) return '--:--';
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="game-over-overlay">
      <div className={`game-over-modal ${isVictory ? 'victory' : 'defeat'}`}>
        <div className="game-over-content-wrapper">
          {isVictory ? (
            <>
              <div className="icon-wrapper victory-icon-wrapper">
                <FontAwesomeIcon icon={faTrophy} size="3x" className="victory-trophy" />
              </div>
              <h2 className="victory-text">VITÓRIA!</h2>
              <p className="game-over-subtitle">Nível concluído com sucesso!</p>
              
              <div className="time-info" style={{ margin: '15px 0', fontSize: '1.2rem', color: '#ffea00' }}>
                <p>Tempo: {formatTime(elapsedTime)}</p>
                <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Melhor: {formatTime(bestTime)}</p>
              </div>

              <div className="victory-stars">
                {Array.from({ length: 3 }).map((_, i) => (
                  <FontAwesomeIcon 
                    key={i} 
                    icon={faStar} 
                    className={`star-icon ${i < lives ? 'earned' : 'lost'}`} 
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="icon-wrapper defeat-icon-wrapper">
                <FontAwesomeIcon icon={faSkull} size="3x" className="defeat-skull" />
              </div>
              <h2 className="defeat-text glitch" data-text="GAME OVER">
                GAME OVER
              </h2>
              <p className="game-over-subtitle">Suas vidas acabaram.</p>
            </>
          )}
        </div>
        
        <div className="game-over-actions">
          <button className="play-again-btn" onClick={onPlayAgain}>
            JOGAR NOVAMENTE
          </button>
          
          {isVictory && nextLevelId !== null && (
            <button 
              className="next-level-btn" 
              onClick={() => {
                navigate(`/campaign/${campaignId}/level/${nextLevelId}/play`);
                // Força um refresh se necessário ou o componente React Router cuidará
              }}
            >
              PRÓXIMA FASE
            </button>
          )}

          <button 
            className="select-phase-btn" 
            onClick={() => navigate(`/campaign/${campaignId}`)}
          >
            SELECIONAR FASE
          </button>
        </div>
      </div>
    </div>
  );
}
