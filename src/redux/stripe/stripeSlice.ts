import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_USER_TOKEN } from "../../constants";
import { http, setToken } from "../../http";
import { AppState, AppThunk } from "../store";

export interface StripeState {
  clientSecret: string;
  loading: boolean;
  error: string;
}

export interface StripeResponse {
  clientSecret: string;
}

const initialState: StripeState = {
  clientSecret: '',
  loading: false,
  error: ''
}

export const stripeSlice = createSlice({
  name: 'stripe',
  initialState,
  reducers: {
    startStripeRequest: (state) => {
      state.loading = true;
      state.error = '';
    },
    stripeRequestSuccess: (state, { payload: { clientSecret } }: PayloadAction<StripeResponse>) => {
      state.loading = false;
      state.error = '';
      state.clientSecret = clientSecret
    },
    stripeRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  startStripeRequest,
  stripeRequestSuccess,
  stripeRequestFailure
} = stripeSlice.actions

export const selectSecret = (state: AppState) => state.stripe.clientSecret;

export const createPaymentIntent = (): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { user } = getState();
      const token = user.token || localStorage.getItem(LOCAL_STORAGE_USER_TOKEN) || '';
      dispatch(startStripeRequest());
      const result = await http.post('/create-payment-intent', { price: 900 }, setToken(token));
      dispatch(stripeRequestSuccess(result.data));
    } catch (error) {
      dispatch(stripeRequestFailure(error?.response?.data))
    }
  }

export default stripeSlice.reducer;
