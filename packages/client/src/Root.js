import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './styles.scss';

import { createStore, createApolloClient, getHistory } from './global';

export const Root = ({ reducers, routes, createGqlLink }) => {
  const apolloClient = createApolloClient(createGqlLink);
  const store = createStore(reducers);
  const theme = createMuiTheme();
  const history = getHistory();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <Router history={history}>
            <Switch>
              {routes}
            </Switch>
          </Router>
        </ApolloProvider>
      </Provider>
    </ThemeProvider>
  );
};
