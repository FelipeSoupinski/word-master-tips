import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ActionBar from './ActionBar';
import Board from './Board';
import GameOver from './GameOver';
import Header from './Header';
import HintPanel from './HintPanel';
import Toast from './Toast';
import IntroBanner from './IntroBanner';
import GameLog from './GameLog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowLeft, faStar, faBolt, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { processor } from '../services/gameProcessor';
import { getAllProgress, getAttempts } from '../services/progressStorage';

export default function GameView() {
  const { campaignId, levelId } = useParams();
  const navigate = useNavigate();

  const [gameState, setGameState] = useState('initializing');
  const [words, setWords] = useState([]);
  const [guessedWords, setGuessedWords] = useState([]);
  const [currentHint, setCurrentHint] = useState(null);
  const [currentTargets, setCurrentTargets] = useState(0);
  const [error, setError] = useState(null);
  const [bestScore, setBestScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [consecutiveCorrectGuesses, setConsecutiveCorrectGuesses] = useState(0);
  
  const [lives, setLives] = useState(3);
  const [result, setResult] = useState(null);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  
  const [selectedWord, setSelectedWord] = useState(null);
  
  // Intro animation state
  const [showIntro, setShowIntro] = useState(true);

  // Log state
  const [logEntries, setLogEntries] = useState([]);
  const lastHintRef = useRef(null);

  const addLog = (type, text) => {
    setLogEntries(prev => [...prev, { type, text }]);
  };

  // Initial load
  useEffect(() => {
    try {
      const state = processor.startGame(parseInt(campaignId), parseInt(levelId));
      updateState(state);
      
      const allProgress = getAllProgress();
      const uniqueLevelId = `${campaignId}-${levelId}`;
      setBestScore(allProgress[uniqueLevelId] || 0);
      setAttempts(getAttempts(uniqueLevelId));

      // Stop intro animation after 1.8 seconds
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 1800);
      return () => clearTimeout(timer);
    } catch (err) {
      setError(err.message || 'Erro ao iniciar jogo');
      setShowIntro(false);
    }
  }, [campaignId, levelId]);

  useEffect(() => {
    if (!feedbackMessage) return;
    const timer = setTimeout(() => setFeedbackMessage(null), 2000);
    return () => clearTimeout(timer);
  }, [feedbackMessage]);

  const updateState = (state) => {
    setGameState(state.state);
    setWords(state.words || []);
    setGuessedWords(state.guessedWords || []);
    setCorrectGuesses(state.correctGuesses || []);
    setWrongGuesses(state.wrongGuesses || []);
    setLives(state.lives ?? 3);
    setConsecutiveCorrectGuesses(state.consecutiveCorrectGuesses || 0);
    setResult(state.result || null);
    setSelectedWord(null);

    // Track master hint changes for the log
    if (state.currentHint && state.currentHint !== lastHintRef.current) {
      addLog('master', `Dica: ${state.currentHint} (${state.currentTargets} cartas)`);
      lastHintRef.current = state.currentHint;
    }
    
    setCurrentHint(state.currentHint);
    setCurrentTargets(state.currentTargets);
  };

  const handleCardClick = (word) => {
    if (showIntro || gameState !== 'guesser_turn' || guessedWords.includes(word) || correctGuesses.includes(word)) return;
    setSelectedWord(word === selectedWord ? null : word);
  };

  const handleConfirmGuess = () => {
    if (!selectedWord) return;
    const guessedWord = selectedWord;
    
    try {
      const response = processor.guessWord(guessedWord);
      const { correct, recoveredLife, lives: newLives } = response;

      if (correct) {
        if (recoveredLife) {
          setFeedbackMessage({ type: 'correct', text: '5 acertos, vida Recuperada! ❤️' });
        } else {
          setFeedbackMessage({ type: 'correct', text: 'Acertou! ✓' });
        }
        addLog('correct', `Você acertou: ${guessedWord}`);
        if (recoveredLife) {
          addLog('correct', '❤️ 5 acertos, vida recuperada! ❤️');
        }
      } else {
        setFeedbackMessage({ type: 'wrong', text: `Errou! -1 vida (${newLives} restante${newLives !== 1 ? 's' : ''})` });
        addLog('wrong', `Erro ao chutar: ${guessedWord}`);
      }

      updateState(response);
      
    } catch (err) {
      setError(err.message || 'Erro ao enviar palpite');
    }
  };

  const handlePlayAgain = () => {
    try {
      setLogEntries([]);
      lastHintRef.current = null;
      setShowIntro(true);
      const state = processor.startGame(parseInt(campaignId), parseInt(levelId));
      updateState(state);
      
      const allProgress = getAllProgress();
      const uniqueLevelId = `${campaignId}-${levelId}`;
      setBestScore(allProgress[uniqueLevelId] || 0);
      setAttempts(getAttempts(uniqueLevelId));

      setTimeout(() => {
        setShowIntro(false);
      }, 1800);
    } catch (err) {
      setError(err.message || 'Erro ao reiniciar jogo');
      setShowIntro(false);
    }
  };

  if (error) {
    return (
      <div className="app-container">
        <Header />
        <div className="error-message">
          <p>{error}</p>
          <button className="back-btn" onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faArrowLeft} /> Voltar para a Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='app-container'>
      <Header />
      
      <button className="back-btn" onClick={() => navigate(`/campaign/${campaignId}`)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
      </button>

      {showIntro && <IntroBanner />}
      
      {feedbackMessage && <Toast message={feedbackMessage.text} type={feedbackMessage.type} />}

      {gameState === 'finished' && !showIntro && (
        <GameOver 
          result={result}
          onPlayAgain={handlePlayAgain}
          lives={lives}
          campaignId={campaignId}
          levelId={levelId}
        />
      )}

      {!showIntro && (
        <div className="game-content-wrapper">
          <div className="game-layout">
            <aside className="game-sidebar game-sidebar-left">
              <div className="hint-card side-card">
                
                <div className="objective-section">
                  <h3 className="hint-card-title">Seu Objetivo</h3>
                  <HintPanel 
                    currentHint={currentHint} 
                    currentTargets={currentTargets} 
                  />
                </div>

                <hr className="card-divider" />

                <div className="info-card-internal">
                  <div className="info-row">
                    <span className="info-label">Campanha:</span>
                    <span className="info-value">{processor.getAvailableGames().find(g => g.id === parseInt(campaignId))?.name || 'Campanha'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Fase:</span>
                    <span className="info-value">{processor.getLevelsForGame(parseInt(campaignId)).find(l => l.id === parseInt(levelId))?.name || 'Fase'}</span>
                  </div>
                  <div className="info-row score-row">
                    <span className="info-label">Seu Recorde:</span>
                    <span className="info-value stars-value">
                      {bestScore > 0 ? (
                        [...Array(3)].map((_, i) => (
                          <FontAwesomeIcon 
                            key={i} 
                            icon={faStar} 
                            style={{ 
                              color: i < bestScore ? '#FFD700' : '#444', 
                              marginLeft: '2px',
                              fontSize: '0.8rem'
                            }} 
                          />
                        ))
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#888' }}>Não jogada</span>
                      )}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">
                      <FontAwesomeIcon icon={faGamepad} style={{ marginRight: '5px' }} />
                      Tentativas
                    </span>
                    <span className="info-value">{attempts}</span>
                  </div>
                </div>

                <div className="lives-container">
                  <span className="lives-label">Vidas:</span>
                  <div className="lives-indicator">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className={`heart ${i < lives ? 'alive' : 'dead'}`}>
                        <FontAwesomeIcon icon={faHeart} />
                      </span>
                    ))}
                  </div>

                  {lives < 3 && (
                    <div className="combo-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8px' }}>
                      <span className="lives-label" style={{ fontSize: '0.65rem', color: '#ffea00', marginBottom: '2px' }}>Combo +1 Vida</span>
                      <div className="combo-indicator" style={{ display: 'flex', gap: '4px', fontSize: '0.8rem' }}>
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`combo-bolt ${i < consecutiveCorrectGuesses ? 'active' : 'inactive'}`} 
                            style={{ 
                              color: i < consecutiveCorrectGuesses ? '#ffea00' : '#444', 
                              transition: 'color 0.3s, transform 0.3s',
                              transform: i < consecutiveCorrectGuesses ? 'scale(1.1)' : 'scale(1)',
                              textShadow: i < consecutiveCorrectGuesses ? '0 0 5px #ffea00' : 'none'
                            }}
                          >
                            <FontAwesomeIcon icon={faBolt} />
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </aside>

            <main className="game-main">
              <Board
                words={words}
                selectedWords={selectedWord ? [selectedWord] : []}
                guessedWords={guessedWords}
                correctGuesses={correctGuesses}
                wrongWords={wrongGuesses}
                onCardClick={handleCardClick}
              />
            </main>

            <aside className="game-sidebar game-sidebar-right">
              <GameLog logEntries={logEntries} />
            </aside>
          </div>

          {gameState === 'guesser_turn' && (
            <div className="action-area">
              <ActionBar 
                selectedWord={selectedWord} 
                onConfirmGuess={handleConfirmGuess} 
                disabled={false}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
