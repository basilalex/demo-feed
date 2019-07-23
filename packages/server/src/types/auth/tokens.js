import jwt from 'jsonwebtoken';

import { jwt as jwtConfig, secret } from '../../global';

const { tokenExpiresIn, refreshTokenExpiresIn } = jwtConfig;

export const createTokens = async identity => {
  const createToken = jwt.sign({ identity }, secret, { expiresIn: tokenExpiresIn });
  const createRefreshToken = jwt.sign({ id: identity.id }, secret, { expiresIn: refreshTokenExpiresIn });

  return Promise.all([createToken, createRefreshToken]);
};

export const decodeToken = refreshToken => jwt.decode(refreshToken);

export const verify = refreshToken => jwt.verify(refreshToken, secret);
