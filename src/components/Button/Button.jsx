import PropTypes from 'prop-types';

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

Button.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
  hasImages:PropTypes.bool.isRequired,
};

export default Button;

