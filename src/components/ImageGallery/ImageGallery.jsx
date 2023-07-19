import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onImageClick, onLoadMore }) => {
  return (
    <div>
      <ul className="gallery">
        {images.length > 0 && images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={() => onImageClick(image.largeImageURL)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;


