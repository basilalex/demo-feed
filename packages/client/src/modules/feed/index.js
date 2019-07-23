import React from 'react';
import { Route } from 'react-router-dom';

import { Feed } from './containers';

export default {
  routes: [
    <Route key='/' path='/' render={props => <Feed {...props} />} />
  ],
}
