import moment from 'moment';
import React, { useEffect } from 'react';
import { LOCAL_STORAGE_TOKEN_REFRESH_TIME, LOCAL_STORAGE_USER_TOKEN } from '../constants';
import { useAppDispatch } from '../hooks/redux.hooks';
import { getUser, refreshUserToken, setIsLoadedState } from '../redux/user/userSlice';

export default function ProfileProvider({ children }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storageToken = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
    const lastTokenRefresh = localStorage.getItem(LOCAL_STORAGE_TOKEN_REFRESH_TIME) || '';

    if (storageToken) {

      if (!lastTokenRefresh || moment().diff(moment(lastTokenRefresh), 'hours') >= 12) {
        dispatch(refreshUserToken(storageToken));
      }
    }
  });

  useEffect(() => {
    const storageToken = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
    if (storageToken) {
      dispatch(getUser(storageToken));
    } else {
      dispatch(setIsLoadedState());
    }
  });

  return (
    <>
      { children }
    </>
  )
}
