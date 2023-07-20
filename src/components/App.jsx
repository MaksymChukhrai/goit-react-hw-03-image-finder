import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchGallery } from '../services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

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

  // componentDidMount() {
  //   this.fetchImages();
  // }

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery || prevState.page !== this.state.page) {
      this.fetchImages();
    };
  };

  handleSearchSubmit = (query) => {
    this.setState(
      { images: [], searchQuery: query, page: 1 },
      // this.fetchImages
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
    this.setState({ isLoading: true });

    fetchGallery(searchQuery, page)
      .then(({data}) => {
        const newImages = data.hits.map(image => ({
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
  initialImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialIsLoading: PropTypes.bool.isRequired,
  initialError: PropTypes.string,
};

export default App;