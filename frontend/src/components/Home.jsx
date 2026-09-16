import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { processor } from '../services/gameProcessor';
import './Home.css';

export default function Home() {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  if (campaignId !== undefined) {
    const parsedCampaignId = parseInt(campaignId, 10);
    const levels = processor.getLevelsForGame(parsedCampaignId);
    
    return (
      <div className="home-container">
        <div className="home-content levels-content">
          <h1 className="home-title">Selecione uma Fase</h1>
          <div className="levels-grid">
            {levels.map(level => (
              <button 
                key={level.id} 
                className="level-btn" 
                onClick={() => navigate(`/campaign/${parsedCampaignId}/level/${level.id}/play`)}
              >
                {level.name}
              </button>
            ))}
          </div>
          <button className="back-btn" onClick={() => navigate('/')}>
            Voltar
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
