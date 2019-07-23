import gql from 'graphql-tag';

export const REFRESH_TOKENS = gql(`mutation RefreshTokens($refreshToken: String!) {
  refreshTokens(refreshToken: $refreshToken)
}`);
