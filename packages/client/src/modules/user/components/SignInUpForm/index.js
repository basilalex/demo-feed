import React, { useState } from 'react';
import { Formik } from 'formik';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { validationSchema } from './validationSchema';

export const SignInUpForm = ({ title, cta, loading, open, action, onClose }) => {
  const [showPassword, setPasswordVisibility] = useState(false);
  const changePasswordVisibility = () => setPasswordVisibility(!showPassword);

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={variables => action({ variables })}
        validateOnChange={false}
        validationSchema={validationSchema}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Email</InputLabel>
                    <Input
                      autoFocus
                      fullWidth
                      type='email'
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      error={!!props.errors.email}
                      name='email'
                    />
                    {props.errors.email && (
                      <FormHelperText>{props.errors.email}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Password</InputLabel>
                    <Input
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.password}
                      error={!!props.errors.password}
                      name='password'
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton aria-label='Toggle password visibility' onClick={changePasswordVisibility}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {props.errors.password && (
                      <FormHelperText>{props.errors.password}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant='text' type='submit' disabled={loading}>{cta}</Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
