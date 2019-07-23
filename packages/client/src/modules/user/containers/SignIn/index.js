import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

import { SignInUpForm, SnackbarMessage } from '../../components';
import { LOGIN } from './mutations';

export const SignIn = () => {
  const dispatch = useDispatch();
  const [ isFormOpened, setFormOpenState ] = useState(false);
  const [ message, setMessage ] = useState({ variant: '', message: '', open: false });
  const toogleForm = () => setFormOpenState(!isFormOpened);
  const onMessageClose = () => setMessage({ ...message, open: false });

  const onMutationComplete = ({ login: { user: payload } }) => {
    dispatch({ type: 'LOGIN', payload })
    toogleForm();
  };

  const onMutationError = () => setMessage({ variant: 'error', message: 'Login failed!', open: true });

  return (
    <Mutation
      mutation={LOGIN}
      onCompleted={onMutationComplete}
      onError={onMutationError}
    >
      {(login, { loading }) => (
        <>
          <Button onClick={() => setFormOpenState(!isFormOpened)}>Sign in</Button>
          <SignInUpForm
            title='Sign in'
            cta='Sign in'
            open={isFormOpened}
            loading={loading}
            action={login}
            onClose={toogleForm}
          />
          <SnackbarMessage onClose={onMessageClose} {...message} />
        </>
      )}
    </Mutation>
  );
};
