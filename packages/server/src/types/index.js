import photos from './photos';
import auth from './auth';
import user from './user';
import { mergeResolvers } from '../global';

export * from './pubSub';
export default mergeResolvers(auth, user, photos);
