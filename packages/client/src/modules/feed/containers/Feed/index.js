import React from 'react';
import { Query } from 'react-apollo';

import { LIST_PHOTOS } from './queries';
import { Gallery, InfiniteScroll } from '../../components';
import { Page } from '../../../common';

export const Feed = () => {
  const input = { 
    perPage: 20,
    orderBy: 'latest',
  };

  return (
    <Page>
      <Query query={LIST_PHOTOS} variables={{ input: { ...input }}} >
        {({ data, loading, error, fetchMore }) => {
          if (loading) {
            return 'Loading...';
          }

          if (error) {
            return 'Error.';
          }

          const infiniteScrollAction = page => fetchMore({
            variables: { input: { ...input, page }},
            updateQuery: (prevResult, { fetchMoreResult }) => {
              return fetchMoreResult
                ? { listPhotos: [ ...prevResult.listPhotos, ...fetchMoreResult.listPhotos ] }
                : prevResult
            },
          });

          return (
            <InfiniteScroll loading={loading} action={infiniteScrollAction}>
              <Gallery items={data.listPhotos} />
            </InfiniteScroll>
          );
        }}
      </Query>
    </Page>
  );
};
