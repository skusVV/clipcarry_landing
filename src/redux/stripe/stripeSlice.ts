import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_USER_TOKEN, UserRoles } from "../../constants";
import { http, setToken } from "../../http";
import { AppState, AppThunk } from "../store";

export interface StripeState {
  paymentLink: string;
  portalLink: string;
  loading: boolean;
  error: string;
}

export interface StripeResponse {
  url: string;
}

const initialState: StripeState = {
  paymentLink: '',
  portalLink: '',
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
    stripePaymentLintRequestSuccess: (state, { payload: { url } }: PayloadAction<StripeResponse>) => {
      state.loading = false;
      state.error = '';
      state.paymentLink = url
    },
    stripePortalLinkRequestSuccess: (state, { payload: { url } }: PayloadAction<StripeResponse>) => {
      state.loading = false;
      state.error = '';
      state.portalLink = url
    },
    stripeRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    stripeDisableLoading: (state) => {
      state.loading = false;
    }
  }
});

export const {
  startStripeRequest,
  stripePaymentLintRequestSuccess,
  stripePortalLinkRequestSuccess,
  stripeRequestFailure,
  stripeDisableLoading
} = stripeSlice.actions

export const selectPaymentLink = (state: AppState) => state.stripe.paymentLink;
export const selectStripeLoading = (state: AppState) => state.stripe.loading;

export const createPaymentLink = ({ resolve, reject }): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { user } = getState();
      const token = user.token || localStorage.getItem(LOCAL_STORAGE_USER_TOKEN) || '';

      if (user.role !== UserRoles.PAID_USER) {
        dispatch(startStripeRequest());
        const result = await http.get('/create-payment', setToken(token));

        if (result.data.exist) {
          reject();
          dispatch(stripeDisableLoading());
        } else if (result?.data?.paymentLink.url) {
          dispatch(stripePaymentLintRequestSuccess(result.data.paymentLink));
          resolve(result.data.paymentLink.url);
        }

      } else {
        reject();
        dispatch(stripeDisableLoading());
      }

    } catch (error) {
      dispatch(stripeRequestFailure(error?.response?.data))
    }
  }

export const getPortalLink = ({ callback }): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { user, stripe: { portalLink } } = getState();
      if (portalLink) {
        callback(portalLink);
      } else {
        const token = user.token || localStorage.getItem(LOCAL_STORAGE_USER_TOKEN) || '';
        dispatch(startStripeRequest());

        const result = await http.get('/create-portal', setToken(token));

        if (result?.data?.portal.url) {
          dispatch(stripePortalLinkRequestSuccess(result.data.portal));
          callback(result.data.portal.url);
        }
      }
    } catch (error) {
      dispatch(stripeRequestFailure(error?.response?.data))
    }
  };

export default stripeSlice.reducer;
