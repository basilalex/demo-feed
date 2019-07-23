import gql from 'graphql-tag';

export const LIST_PHOTOS = gql(`query ListPhotos($input: ListPhotosInput!) {
  listPhotos(input: $input) {
    id
    color
    likes
    urls {
      small
    }
    user {
      username
      name
    }
  }
}`);
