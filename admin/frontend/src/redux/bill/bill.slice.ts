import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bill, BillModel } from "./bill.state";

export const initialBillState:BillModel = {
    bill: {
        _id: "",
        idBill: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        numSeat: 0,
    },
    listBill: []
}

export const billSlice = createSlice({
    name: "bill",
    initialState: initialBillState,
    reducers:{
        setBill(state, action: PayloadAction<Bill>){
            state.bill = action.payload;
        },
        setListBill(state, action: PayloadAction<Bill[]>){
            state.listBill = action.payload;
        }
    }
})