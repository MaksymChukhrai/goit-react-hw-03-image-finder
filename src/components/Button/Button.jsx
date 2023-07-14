import React from 'react';

const Button = ({ onClick, hasImages }) => {
  if (!hasImages) {
    return null;
  }

  return (
    <button className="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
