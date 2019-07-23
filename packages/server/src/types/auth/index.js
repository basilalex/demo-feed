import { AuthenticationError } from 'apollo-server-errors';
import jwt from 'jsonwebtoken';

import { secret } from '../../global';
import typeDefs from './schema.graphql';
import { mutation } from './mutation';

const getCurrentIdentity = async req => {
  const authorization = req && req.headers && req.headers[ 'authorization' ];

  if (!authorization) {
    return null;
  }

  const parts = authorization.split(' ');
  const token = parts && parts.length === 2 && parts[ 1 ];

  if (token) {
    const { identity } = jwt.verify(token, secret);
    return identity;
  }
};

const createGraphQlContext = async ({ req }) => {
  try {
    const identity = await getCurrentIdentity(req);

    return { req, identity };
  } catch (e) {
    throw new AuthenticationError(e);
  }
};

export default { typeDefs, mutation, createGraphQlContext };
export * from './tokens';
