import './Card.css';

const Card = ({ word, isSelected, isGuessed, isCorrect, isWrong, onClick }) => {
  let classes = 'card';
  if (isCorrect) classes += ' correct';
  else if (isWrong) classes += ' wrong';
  else if (isSelected) classes += ' selected';
  if (isGuessed) classes += ' guessed';

  const isClickable = !isGuessed && !isCorrect && !isWrong;

  return (
    <div 
      className={classes}
      onClick={isClickable ? onClick : undefined}
    >
      <span className="card-text">{word}</span>
    </div>
  );
};

export default Card;
