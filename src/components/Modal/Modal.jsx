import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    // Добавляем обработчик события на элемент window при монтировании компонента
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // Удаляем обработчик события при размонтировании компонента
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl, onClose } = this.props; // Добавляем деструктуризацию для получения свойства onClose

    return (
      <div className="overlay" onClick={this.handleOverlayClick}> {/* Исправляем на this.handleOverlayClick */}
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

export default Modal;


