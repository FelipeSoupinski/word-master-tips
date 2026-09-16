import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = ({ word, isSelected, isGuessed, isCorrect, isWrongCount, onClick }) => {
  const [isAnimatingWrong, setIsAnimatingWrong] = useState(false);

  useEffect(() => {
    if (isWrongCount > 0) {
      setIsAnimatingWrong(true);
      const timer = setTimeout(() => setIsAnimatingWrong(false), 900);
      return () => clearTimeout(timer);
    }
  }, [isWrongCount]);

  let classes = 'card';
  if (isCorrect) classes += ' correct';
  else if (isAnimatingWrong) classes += ' wrong-blink';
  else if (isSelected) classes += ' selected';
  if (isGuessed) classes += ' guessed';

  const isClickable = !isGuessed && !isCorrect;

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
