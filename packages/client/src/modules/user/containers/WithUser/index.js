import React from 'react';
import { useDispatch } from 'react-redux';
import { Query } from 'react-apollo';
import { USER } from './query';

export const WithUser = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <Query query={USER}>
      {({ data }) => {
        if (data && data.user) {
          dispatch({ type: 'LOGIN', payload: data.user });
        }

        return children;
      }}
    </Query>
  );
};
