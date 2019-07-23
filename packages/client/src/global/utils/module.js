export const mergeModules = (...modules) => {
  const reducers = modules.reduce((acc, { reducers }) => reducers ? ({ ...acc, ...reducers }) : acc, {});
  const routes = modules.reduce((acc, { routes }) => routes ? acc.concat(...routes) : acc, []);
  const createGqlLink = modules.reduce((acc, { createGqlLink }) => createGqlLink ? acc.concat(...createGqlLink) : acc, []);

  return { reducers, routes, createGqlLink };
};
