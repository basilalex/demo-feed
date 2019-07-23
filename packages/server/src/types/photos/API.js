import { unsplashAPI } from '../../global';

export const API = {
  async listPhotos({ page, perPage, orderBy }) {
    return unsplashAPI.get(`/photos?page=${page || ''}&per_page=${perPage || ''}&orde_by=${orderBy || ''}`);
  },
};
