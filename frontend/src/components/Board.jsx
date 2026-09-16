import './Board.css';
import Card from './Card';

const Board = ({ words, selectedWords, guessedWords, correctGuesses, wrongWords, onCardClick }) => {
  return (
    <div className="board">
      {words.map((word, index) => (
        <Card 
          key={index} 
          word={word} 
          isSelected={selectedWords.includes(word)}
          isGuessed={guessedWords ? guessedWords.includes(word) : false}
          isCorrect={correctGuesses ? correctGuesses.includes(word) : false}
          isWrong={wrongWords ? wrongWords.includes(word) : false}
          onClick={() => onCardClick(word)}
        />
      ))}
    </div>
  );
};

export default Board;
