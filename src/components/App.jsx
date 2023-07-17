import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const API_KEY = '36686199-3af1daf12518f9079ef45ad7e';
const PER_PAGE = 12;

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    page: 1,
    showModal: false,
    selectedImage: null,
  };

  handleSearchSubmit = query => {
    this.setState(
      { images: [], searchQuery: query, page: 1 },
      this.fetchImages
    );
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      this.fetchImages
    );
  };

  handleOpenModal = imageUrl => {
    this.setState({ selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=${PER_PAGE}`;

    this.setState({ isLoading: true });

    axios
      .get(url)
      .then(response => {
        const newImages = response.data.hits.map(image => ({
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
        }));

        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          isLoading: false,
          error: null,
        }));
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message });
      });
  };

  render() {
    const { images, isLoading, error, selectedImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleOpenModal} />
        {isLoading && <Loader />}
        {!isLoading && images.length > 0 && (
          <Button
            onLoadMoreClick={this.handleLoadMore}
            hasImages={images.length > 0}
          />
        )}
        {selectedImage && (
          <Modal imageUrl={selectedImage} onClose={this.handleCloseModal} />
        )}
        {error && <p>Error: {error}</p>}
      </div>
    );
  }
}

App.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,

  isLoading: PropTypes.bool.isRequired,

  error: PropTypes.string,

  selectedImage: PropTypes.string,

  handleSearchSubmit: PropTypes.func.isRequired,

  handleLoadMore: PropTypes.func.isRequired,

  handleOpenModal: PropTypes.func.isRequired,

  handleCloseModal: PropTypes.func.isRequired,
};

export default App;
