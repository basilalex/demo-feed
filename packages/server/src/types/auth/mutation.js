import { ApolloError } from 'apollo-server';
import { AuthenticationError } from 'apollo-server-errors';

import { getIdentity } from '../user';
import { createTokens, decodeToken, verify } from './tokens';

export const mutation = {
  async refreshTokens(parent, { refreshToken }) {
    try {
      const decodedToken = decodeToken(refreshToken);
      const isValidToken = decodedToken && decodedToken.id;

      if (!isValidToken) {
        throw new AuthenticationError('Invalid refresh token');
      }

      const user = await getIdentity(decodedToken.id);

      try {
        verify(refreshToken);
      } catch (e) {
        throw new AuthenticationError(e);
      }

      return createTokens(user);
    } catch (e) {
      return new ApolloError(e.message, e.code);      
    }
  }
};
