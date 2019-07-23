import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const OBSERVER_CONFIG = {
  rootMargin: '0px',
  threshold: [0.0],
  delay: 100,
};

let previousY = 0;
let previousRatio = 0;

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  content: {
    minHeight: '150vh',
  },
  loader: {
    width: '100%',
    height: '30%',
    maxHeight: '50vh',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});

export const InfiniteScroll = ({ children, loading, action }) => {
  const target = useRef(null);
  const page = useRef(1);
  const classes = useStyles();

  useEffect(() => {
    const entryCallback = ({ boundingClientRect, intersectionRatio, isIntersecting }) => {
      const isScrollingDown = boundingClientRect.y < previousY;
      const isEnteringTarget = intersectionRatio > previousRatio && isIntersecting;

      if (isScrollingDown && isEnteringTarget && !loading) {
        page.current = page.current + 1;
        action(page.current);
      }

      previousY = boundingClientRect.y;
      previousRatio = intersectionRatio;
    };

    const current = new IntersectionObserver(entries => entries.forEach(entryCallback), OBSERVER_CONFIG);
    current.observe(target.current);

    return () => current.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={classes.root}>
      <div className={classes.root}>{children}</div>
      <div tabIndex='-1' ref={target} className={classes.loader}></div>
    </section>
  );
};
