import React, { Component } from 'react';


class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.props.onClose();
    }
  };

  handleClickOutside = (event) => {
    if (event.target.classList.contains('overlay')) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl } = this.props;

    return (
      <div className="overlay" onClick={this.handleClickOutside}>
        <div className="modal">
          <img src={imageUrl} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
