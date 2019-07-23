import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import Button from '@material-ui/core/Button';

import { SignInUpForm, SnackbarMessage } from '../../components';
import { REGISTER } from './mutations';

export const SignUp = () => {
  const [ isFormOpened, setFormOpenState ] = useState(false);
  const [ message, setMessage ] = useState({ variant: '', message: '', open: false });
  const toogleForm = () => setFormOpenState(!isFormOpened);
  const onMessageClose = () => setMessage({ ...message, open: false });

  const onMutationComplete = ({ register: { user }}) => {
    toogleForm();
    setMessage({ variant: 'success', message: `${user.email} was registered!`, open: true });
  };

  const onMutationError = () => setMessage({ variant: 'error', message: 'Registration failed!', open: true });

  return (
    <Mutation
      mutation={REGISTER}
      onCompleted={onMutationComplete}
      onError={onMutationError}
    >
      {(login, { loading }) => (
        <>
          <Button onClick={() => setFormOpenState(!isFormOpened)}>Sign up</Button>
          <SignInUpForm
            title='Sign up'
            cta='Sign up'
            open={isFormOpened}
            loading={loading}
            action={login}
            onClose={toogleForm}
          />
          <SnackbarMessage onClose={onMessageClose} {...message} />
        </>
      )}
    </Mutation>
  )
};
