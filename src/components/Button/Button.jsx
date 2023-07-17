import React from 'react';

const Button = ({ onLoadMoreClick, hasImages }) => {
  const handleClick = () => {
   
    onLoadMoreClick();
  };

  if (!hasImages) {
    return null;
  }

  return (
    <button className="load-button" onClick={handleClick}>
      Load more
    </button>
  );
};

export default Button;
