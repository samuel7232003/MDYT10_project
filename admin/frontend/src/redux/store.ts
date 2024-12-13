import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import userSlice from "./user/user.slice";
import { billSlice } from "./bill/bill.slice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        bill: billSlice.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch