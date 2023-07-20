import axios from 'axios';

const API_KEY = '36686199-3af1daf12518f9079ef45ad7e';
const PER_PAGE = 12;

export const fetchGallery = (searchQuery, page) => {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&page=${page}&per_page=${PER_PAGE}`;

  return axios.get(url);
};
