import { ThunkAction } from "redux-thunk";
import { billSlice } from "./bill.slice";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { getDataBill } from "../../services/PaymentServices";
import { Bill } from "./bill.state";

export const billAction = billSlice.actions;

export const getListBill = ():ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) =>{
        const listBill:Bill[] = await getDataBill();
        dispatch(billAction.setListBill(listBill));
    }
}