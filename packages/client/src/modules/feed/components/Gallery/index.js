import React from 'react';
import Masonry from 'react-masonry-component';
import { makeStyles } from '@material-ui/core/styles';

import { Image } from '..';

const useStyles = makeStyles({
  gallery: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  item: {
    padding: '4px',
    maxWidth: '50%',

    '@media screen and (min-width: 500px)': {
      width: '33.333%',
    },

    '@media screen and (min-width: 1024px)': {
      width: '25%',
    },
  },
});

export const Gallery = ({ items }) => {
  const classes = useStyles();

  const masonryProps = {
    className: classes.gallery,
    options: { transitionDuration: 0 },
    enableResizableChildren: true,
    elementType: 'div',
  };

  return (
    <Masonry {...masonryProps}>
      {items.map(({ id, urls, likes }) => (
        <div key={`${id}${likes}`} className={classes.item}>
          <Image src={urls.small} alt='thumb' />
        </div>
      ))}
    </Masonry>
  );
};
