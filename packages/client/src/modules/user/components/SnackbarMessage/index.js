import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useContentStyles = makeStyles(theme => ({
  success: {
    backgroundColor: '#43a047',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: '#ffa000',
  },
  icon: {
    opacity: 0.9,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Content = ({ variant, message, onClose }) => {
  const classes = useContentStyles();

  return (
    <SnackbarContent
      className={classes[ variant ]}
      message={<span className={classes.message}>{message}</span>}
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
    />
  );
};

export const SnackbarMessage = ({ open, onClose, ...rest }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    onClose={onClose}
  >
    <Content {...rest} onClose={onClose} />
  </Snackbar>
);
