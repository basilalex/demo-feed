export const getItem = name => window.localStorage.getItem(name);

export const saveTokens = async ({ accessToken, refreshToken }) => {
  await window.localStorage.setItem('accessToken', accessToken);
  await window.localStorage.setItem('refreshToken', refreshToken);
};

export const removeTokens = async () => {
  await window.localStorage.removeItem('accessToken');
  await window.localStorage.removeItem('refreshToken');
};
