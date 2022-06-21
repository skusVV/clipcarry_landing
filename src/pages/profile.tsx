import React, { useEffect } from 'react';
import { LOCAL_STORAGE_USER_TOKEN } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks';
import { getUser, selectToken } from '../redux/user/userSlice';

export default function ProfileProvider({ children }) {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storageToken = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
    if (storageToken) {
      dispatch(getUser(storageToken));
    }
  }, [token]);

  return (
    <>
      { children }
    </>
  )
}