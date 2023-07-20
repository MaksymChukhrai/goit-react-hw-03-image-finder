import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl, onClose } = this.props;
    return (
      <div className="overlay" onClick={this.handleOverlayClick}>
        <div className="modal">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <img src={imageUrl} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
