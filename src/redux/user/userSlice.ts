import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LOCAL_STORAGE_USER_ROLE, LOCAL_STORAGE_USER_TOKEN, UserRoles } from '../../constants';
import { http, setToken } from '../../http';

import type { AppState, AppThunk } from "../store";


export interface UserState {
  email: string;
  userGuid: string;
  firstName: string;
  lastName: string;
  token: string;
  role: string;
  error: string;
  loading: boolean;
}

const initialState: UserState = {
  email: '',
  userGuid: '',
  firstName: '',
  lastName: '',
  token: '',
  role: '',
  error: '',
  loading: false
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

interface UserResponse {
  userGuid?: string;
  token: string;
  role: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startUserRequest: (state) => {
      state.loading = true;
      state.error = '';
    },
    authUserSuccess: (state, { payload: { token, role } }: PayloadAction<UserResponse>) => {
      state.loading = false;
      state.error = '';
      state.token = token;
      state.role = role;
      localStorage.setItem(LOCAL_STORAGE_USER_TOKEN, token);
      localStorage.setItem(LOCAL_STORAGE_USER_ROLE, role);
    },
    fetchUserSuccess: (state, { payload }: PayloadAction<UserResponse>) => {
      state.loading = false;
      state.error = '';
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.token = payload.token;
      state.role = payload.role;
      state.userGuid = payload.userGuid;
    },
    userRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
})

export const {
  startUserRequest,
  authUserSuccess,
  userRequestFailure,
  fetchUserSuccess
} = userSlice.actions

export const selectError = (state: AppState) => state.user.error;
export const selectToken = (state: AppState) => state.user.token;
export const selectRole = (state: AppState) => state.user.role;
export const selectUser = (state: AppState) => state.user;
export const selectLoading = (state: AppState) => state.user.loading;

export const registerUser = (data: RegisterData, callback: () => void): AppThunk =>
  async (dispatch, getState) => {
    const { user: { role, userGuid } } = getState();
    try {
      dispatch(startUserRequest());

      if (userGuid && role === UserRoles.GUEST) {
        data['userGuid'] = userGuid;
      }

      const user = await http.post('/register', data);

      dispatch(authUserSuccess(user.data));
      callback();
    } catch (error) {
      dispatch(userRequestFailure(error?.response?.data));
    }
}


export const getUser = (token = ''): AppThunk =>
  async (dispatch) => {
    try {
      if (token) {
        dispatch(startUserRequest());
        const user = await http.get('/user', setToken(token));

        dispatch(fetchUserSuccess({ ...user.data, token }));
      }
    } catch (error) {
      dispatch(userRequestFailure(error?.response?.data));
    }
}

export const loginUser = (data: LoginData, callback: () => void): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(startUserRequest());
      const user = await http.post('/login', data);

      dispatch(authUserSuccess(user.data));
      callback();
    } catch (error) {
      dispatch(userRequestFailure(error?.response?.data));
    }
}

export const promoteUser = (token: string): AppThunk =>
  async (dispatch) => {
    try {
      if (token) {
        dispatch(startUserRequest());
        const response = await http.patch('/user/promote', {}, setToken(token));

        dispatch(authUserSuccess(response.data));
      }
    } catch (error) {
      dispatch(userRequestFailure(error?.response?.data));
    }
}

export default userSlice.reducer
