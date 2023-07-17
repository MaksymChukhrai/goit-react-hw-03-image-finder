import React from 'react';

const ImageGalleryItem = ({ image, onClick }) => {
  const handleImageClick = () => {
    onClick(image.largeImageURL);
  };

  return (
    <li className="gallery-item">
      <img
        src={image.webformatURL}
        alt=""
        onClick={handleImageClick}
        className="gallery-image"
      />
    </li>
  );
};

export default ImageGalleryItem;
