import { ApolloError } from 'apollo-server';
import { API } from './API';

export const query = {
  async listPhotos(parent, { input }) {
    try {
      const photos = await API.listPhotos(input);
      return photos.data;
    } catch (e) {
      return new ApolloError(e.message, e.code);
    }
  },
};
