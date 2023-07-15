import React from 'react';

const Button = ({ onClick, hasImages }) => {
    const handleClick = () => {
      console.log("Button clicked"); // Добавляем console.log для проверки
      onClick();
    };
  
    if (!hasImages) {
      return null;
    }
  
    return (
      <button className="button" onClick={handleClick}>
        Load more
      </button>
    );
  };

export default Button;
