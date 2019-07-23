import { createBrowserHistory } from 'history';

export const getHistory = (() => {
  const history = createBrowserHistory();

  return () => history;
})();
