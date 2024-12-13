import { ThunkAction } from "redux-thunk";
import { seatSlice } from "./seat.slice";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { getDataSeat } from "../../services/PaymentServices";
import { Seat } from "./seat.state";

export const seatAction = seatSlice.actions;

export const getListSeat = ():ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) =>{
        const listSeat:Seat[] = await getDataSeat();
        dispatch(seatAction.setListSeat(listSeat));
    }
}