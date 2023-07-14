
import React, { Component } from 'react';
import axios from 'axios';
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
    selectedImage: '',
  };

  handleSearchSubmit = (query) => {
    this.setState({ images: [], searchQuery: query, page: 1 }, this.fetchImages);
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }), this.fetchImages);
  };

  handleOpenModal = (imageURL) => {
    this.setState({ selectedImage: imageURL, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: '', showModal: false });
  };

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    const apiKey = '36686199-3af1daf12518f9079ef45ad7e';
    const perPage = 12;
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&page=${page}&per_page=${perPage}`;

    this.setState({ isLoading: true });

    axios
      .get(url)
      .then((response) => {
        const newImages = response.data.hits.map((image) => ({
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
        }));

        this.setState((prevState) => ({
          images: [...prevState.images, ...newImages],
          isLoading: false,
          error: null,
        }));
      })
      .catch((error) => {
        this.setState({ isLoading: false, error: error.message });
      });
  };

  render() {
    const { images, isLoading, error, showModal, selectedImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleOpenModal} />
        {isLoading && <Loader />}
        {!isLoading && images.length > 0 && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        {showModal && (
          <Modal imageUrl={selectedImage} onClose={this.handleCloseModal} />
        )}
        {error && <p>Error: {error}</p>}
      </div>
    );
  }
}

export default App;
