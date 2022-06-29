import { createSlice } from '@reduxjs/toolkit'

import {AppState} from "../store";

export interface MessageState {
    isOpen: boolean
    message: string
}

const initialState: MessageState = {
    isOpen: false,
    message: ''
}


export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        closePopup: (state) => {
            state.isOpen = false;
            state.message = '';
        },
        openPopup: (state, { payload }: any) => {
            state.isOpen = true;
            state.message = payload;
        },

    }
})
export const {
    closePopup,
    openPopup
} = messageSlice.actions

export const showMessagePopup = ({ message }) => {

    return (dispatch) => {
        dispatch(openPopup(message));

        setTimeout(() => {
            dispatch(closePopup());
        }, 3000);
    };
};


export const selectMessage = (state: AppState) => state.message.message;
export const selectIsOpen = (state: AppState) => state.message.isOpen;

export default messageSlice.reducer
