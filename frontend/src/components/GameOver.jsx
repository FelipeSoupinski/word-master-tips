import './GameOver.css';

export default function GameOver({ result, onPlayAgain }) {
  const isVictory = result === 'victory';

  return (
    <div className="game-over-overlay">
      <div className={`game-over-modal ${isVictory ? 'victory' : 'defeat'}`}>
        {isVictory ? (
          <>
            <h2>PARABÉNS! VOCÊ VENCEU!</h2>
            <p className="game-over-subtitle">Todas as palavras foram adivinhadas!</p>
          </>
        ) : (
          <>
            <h2>GAME OVER! VOCÊ PERDEU!</h2>
            <p className="game-over-subtitle">Suas vidas acabaram.</p>
          </>
        )}
        <button className="play-again-btn" onClick={onPlayAgain}>
          JOGAR NOVAMENTE
        </button>
      </div>
    </div>
  );
}
