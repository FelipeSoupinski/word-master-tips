import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft, faGamepad, faPlay } from '@fortawesome/free-solid-svg-icons';
import { processor } from '../services/gameProcessor';
import { getAllProgress, getAllAttempts } from '../services/progressStorage';
import './Home.css';

export default function Home() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});
  const [attemptsData, setAttemptsData] = useState({});

  useEffect(() => {
    setProgress(getAllProgress());
    setAttemptsData(getAllAttempts());
  }, []);

  if (campaignId !== undefined) {
    const parsedCampaignId = parseInt(campaignId, 10);
    const levels = processor.getLevelsForGame(parsedCampaignId);
    
    // Sort levels alphabetically
    const sortedLevels = [...levels].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    
    return (
      <div className="home-container">
        <div className="home-content levels-content">
          <h1 className="home-title">Selecione uma Fase</h1>
          <div className="levels-grid">
            {sortedLevels.map(level => {
              const uniqueLevelId = `${parsedCampaignId}-${level.id}`;
              const stars = progress[uniqueLevelId] || 0;
              const attemptsCount = attemptsData[uniqueLevelId] || 0;
              
              return (
                <button 
                  key={level.id} 
                  className="level-btn" 
                  onClick={() => navigate(`/campaign/${parsedCampaignId}/level/${level.id}/play`)}
                >
                  <div className="level-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div className="level-name" style={{ marginBottom: 0 }}>{level.name}</div>
                    <FontAwesomeIcon icon={faPlay} style={{ color: 'var(--neon-cyan)', opacity: 0.8, fontSize: '1.2rem' }} />
                  </div>
                  
                  <div className="level-stats" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', width: '100%', minHeight: '20px' }}>
                    {attemptsCount > 0 ? (
                      <div className="level-attempts" style={{ fontSize: '0.8rem', color: '#aaa', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FontAwesomeIcon icon={faGamepad} /> {attemptsCount}
                      </div>
                    ) : (
                      <div></div>
                    )}
                    
                    {stars > 0 ? (
                      <div className="level-stars" style={{ display: 'flex', gap: '4px' }}>
                        {Array.from({ length: stars }).map((_, i) => (
                          <FontAwesomeIcon key={i} icon={faStar} style={{ color: '#FFD700', fontSize: '0.9rem' }} />
                        ))}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <button className="back-btn" onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faArrowLeft} /> Voltar
          </button>
        </div>
      </div>
    );
  }

  const games = processor.getAvailableGames();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Dica de Mestre</h1>
        <p className="home-subtitle">Teste sua intuição no jogo de palavras</p>
        
        <div className="campaign-selection" style={{ marginTop: '50px' }}>
          <h2>Selecione uma Campanha</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            {games.map(game => (
              <button 
                key={game.id} 
                className="start-btn" 
                onClick={() => navigate(`/campaign/${game.id}`)}
              >
                {game.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
