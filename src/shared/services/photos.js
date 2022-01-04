import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

const API_KEY = '24499168-c2c7d94c072f729a438874bbc';
const LIMIT = 40; //images limit per page

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    per_page: LIMIT,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

const getPhotos = page => {
  return instance.get(`?page=${page}`);
};

const searchPhotos = (page = 1, q) => {
  return instance.get('', {
    params: {
      page,
      q,
    },
  });
};

export const photosApi = {
  getPhotos,
  searchPhotos,
};
