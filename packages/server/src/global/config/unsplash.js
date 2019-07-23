import axios from 'axios';
import { env } from '..';

export const unsplashAPI = axios.create({
  baseURL: env.UNSPLASH_API_URL,
});

unsplashAPI.defaults.headers.common[ 'Authorization' ] = `Client-ID ${env.UNSPLASH_ACCESS}`;
