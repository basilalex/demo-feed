export const jwt = {
  tokenExpiresIn: '10s',
  refreshTokenExpiresIn: '7d',
};

export const secret = process.env.AUTH_SECRET || 'dev';
