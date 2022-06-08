import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http } from '../../http';

import type { AppState, AppThunk } from "../store";


export interface UserState {
  email: string,
  userGuid: string,
  firstName: string,
  lastName: string,
  token: string,
  error: null,
  role: string,
  loading: boolean;
}

const initialState: UserState = {
  email: '',
  userGuid: '',
  firstName: '',
  lastName: '',
  token: '',
  error: null,
  role: '',
  loading: false
}

export interface RegisterData {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}

export const registerUserAsync = createAsyncThunk(
  'user/register',
  async (data: RegisterData) => {
    const response = await http.post('/register', data);
    console.log("🚀 ~ file: userSlice.ts ~ line 33 ~ response", response)
    return response.data;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    testRd: (state, action: PayloadAction<string>) => {
      state.email += action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false,
        state.token = action.payload.token
      })
  },
})

export const { testRd } = userSlice.actions

export const selectEmail = (state: AppState) => state.user.email;


export const registerUser = (data: RegisterData): AppThunk =>
  async (dispatch, getState) => {
    const user = await dispatch(registerUserAsync(data));
    console.log("🚀 ~ file: userSlice.ts ~ line 74 ~ user", user)
}

export default userSlice.reducer
