import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: 0,
  },
});

export const Image = ({ src, alt }) => {
  const classes = useStyles();

  return (
    <figure className={classes.root}>
      <img src={src} alt={alt} />
    </figure>
  );
};
