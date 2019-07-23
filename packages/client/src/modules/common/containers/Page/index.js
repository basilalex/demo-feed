import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

import { Profile, WithUser } from '../../../user';

const useStyles = makeStyles({
  content: {
    paddingTop: '80px',
  },
});

export const Page = ({ children }) => {
  const classes = useStyles();
  
  return (
    <WithUser>
      <Container maxWidth='md'>
        <Grid container spacing={2} direction='column'>
          <Grid>
            <AppBar>
              <Toolbar>
                <Profile />
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid component='main' className={classes.content}>{children}</Grid>
        </Grid>
      </Container>
    </WithUser>
  );
};
