import typeDefs from './schema.graphql';
import { mutation } from './mutation';
import { query } from './query';
import { User } from './User';

export default { typeDefs, mutation, query };

export const getIdentity = User.getUserById;
export * from './User';
