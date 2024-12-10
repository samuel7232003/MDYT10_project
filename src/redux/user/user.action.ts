import { ThunkAction } from "redux-thunk";
import userSlice from "./user.slice";
import { User } from "./user.state";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";

export const userAction = userSlice.actions;

export const setUser = (user: User):ThunkAction<void, RootState, unknown, AnyAction> => {
    return (dispatch, getState) => {
        dispatch(userAction.setUser_(user));
    }
}