import { mergeModules } from '../global';
import auth from './auth';
import feed from './feed';
import user from './user';

export default mergeModules(auth, feed, user);
