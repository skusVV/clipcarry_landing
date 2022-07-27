import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment';
import cookieCutter from 'cookie-cutter'
import { LOCAL_STORAGE_REGISTRATION_PROMOCODE, LOCAL_STORAGE_TOKEN_REFRESH_TIME, LOCAL_STORAGE_USER_ROLE, LOCAL_STORAGE_USER_TOKEN, UserRoles } from '../../constants';
import { http, setToken } from '../../http';
import type { AppState, AppThunk } from "../store";

export interface UserState {
  email: string;
  userGuid: string;
  firstName: string;
  lastName: string;
  token: string;
  role: string;
  paymentExpirationDate: string;
  customerId: string;
  error: string;
  loading: boolean;
  isLoaded: boolean;
  isInvitedUser: boolean;
}

const initialState: UserState = {
  email: '',
  userGuid: '',
  firstName: '',
  lastName: '',
  token: '',
  role: '',
  paymentExpirationDate: '',
  customerId: '',
  error: '',
  loading: false,
  isLoaded: false,
  isInvitedUser: false
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  promoCode?: string;
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
  paymentExpirationDate?: string;
  customerId?: string;
  isInvitedUser?: boolean;
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
      localStorage.setItem(LOCAL_STORAGE_TOKEN_REFRESH_TIME, moment().toISOString());

      cookieCutter.set('shared_user_token', token, { expires: moment().add(1, 'month').toDate() });

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
      state.paymentExpirationDate = payload.paymentExpirationDate;
      state.customerId = payload.customerId;
      state.isInvitedUser = payload.isInvitedUser;
      state.isLoaded = true;
    },
    userRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    sendResetPasswordSuccess: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.loading = false;
      state.error = '';
    },
    disableLoading: (state) => {
      state.loading = false;
    },
    clearErrors: (state) => {
      state.error = '';
    },
    setIsLoadedState: (state) => {
      state.isLoaded = true
    },
  }
})

export const {
  startUserRequest,
  authUserSuccess,
  userRequestFailure,
  fetchUserSuccess,
  sendResetPasswordSuccess,
  disableLoading,
  clearErrors,
  setIsLoadedState
} = userSlice.actions

export const selectError = (state: AppState) => state.user.error;
export const selectToken = (state: AppState) => state.user.token;
export const selectRole = (state: AppState) => state.user.role;
export const selectUser = (state: AppState) => state.user;
export const selectUserEmail = (state: AppState) => state.user.email;
export const selectUserLoading = (state: AppState) => state.user.loading;

export const registerUser = (data: RegisterData, callback: () => void): AppThunk =>
  async (dispatch, getState) => {
    const { user: { role, userGuid } } = getState();
    const promoCode = localStorage.getItem(LOCAL_STORAGE_REGISTRATION_PROMOCODE);

    try {
      dispatch(startUserRequest());

      if (userGuid && role === UserRoles.GUEST) {
        data['userGuid'] = userGuid;
      }

      if (promoCode) {
        data['promoCode'] = promoCode;
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

export const promoteUser = ({ token, session_id, callback }): AppThunk =>
async (dispatch) => {
  try {
      if (token) {
        dispatch(startUserRequest());
        const response = await http.patch('/user/promote', { session_id }, setToken(token));

        dispatch(authUserSuccess(response.data));
        callback();
      }
    } catch (error) {
      dispatch(userRequestFailure(error?.response?.data));
    }
}

export const refreshUserToken = (token: string): AppThunk =>
  async (dispatch) => {
    try {
      if (token) {
        dispatch(startUserRequest());
        const response = await http.post('/refresh-token', {}, setToken(token));
        dispatch(authUserSuccess(response.data));
      }
    } catch (error) {
      dispatch(userRequestFailure(error?.response?.data));
    }
  }

export const sendResetPasswordEmail = ({ email, callback }): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(startUserRequest());

      const response = await http.post('/reset-password', { email });

      if (response.status === 200) {
        dispatch(sendResetPasswordSuccess(email));
        callback();
      }

    } catch (error) {
      dispatch(userRequestFailure(error?.response?.data));
    }
  }

export const resetUserPassword = ({ resetPasswordKey, password, callback }): AppThunk =>
  async (dispatch) => {
    try {
      if (resetPasswordKey && password) {
        dispatch(startUserRequest());

        const response = await http.patch(`/password/${resetPasswordKey}`, { password });

        if (response.status === 200) {
          dispatch(disableLoading());
          callback();
        }
      }
    } catch (error) {
      dispatch(userRequestFailure(error?.response?.data));
    }
  }

export const changeUserPassword = ({ oldPassword, newPassword, callback }): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { user: { token } } = getState();
      if (token && oldPassword && newPassword) {
        dispatch(startUserRequest());

        const response = await http.patch('/user/password', {
          old_password: oldPassword,
          new_password: newPassword
        }, setToken(token));

        if (response.status === 200) {
          dispatch(disableLoading());
          callback();
        }
      }
    } catch (error) {
      dispatch(userRequestFailure(error?.response?.data));
    }
  }
export default userSlice.reducer
