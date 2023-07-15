import React from 'react';
import * as basicLightbox from 'basiclightbox';

const ImageGalleryItem = ({ image }) => {
  const handleImageClick = () => {
    const instance = basicLightbox.create(`
      <img src="${image.largeImageURL}" width="1400" height="900">
    `);
    instance.show();
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

