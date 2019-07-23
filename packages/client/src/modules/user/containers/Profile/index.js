import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { SignIn, SignUp } from '..';
import { removeTokens } from '../../../auth';

export const Profile = () => {
  const dispatch = useDispatch();
  const [ anchorEl, setAnchorEl ] = useState(null);
  const user = useSelector(({ user }) => user);

  const openMenu = ({ target }) => setAnchorEl(target);
  const closeMenu = () => setAnchorEl(null);

  const logout = () => {
    removeTokens();
    dispatch({ type: 'LOGOUT' })
  };

  return user ? (
    <div>
      <IconButton onClick={openMenu} color='inherit'>
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!anchorEl}
        onClose={closeMenu}
      >
        <MenuItem onClick={logout}>Sign out</MenuItem>
      </Menu>
    </div>
  ) : (
      <>
        <SignIn />
        <SignUp />
      </>
    )
};
