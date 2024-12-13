import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Seat, SeatModel } from "./seat.state";

export const initialSeatState:SeatModel = {
    seat: {
        idTicket: "",
        name: "",
        status: "NONE"
    },
    listSeat: []
}

export const seatSlice = createSlice({
    name: "seat",
    initialState: initialSeatState,
    reducers:{
        setSeat(state, action: PayloadAction<Seat>){
            state.seat = action.payload;
        },
        setListSeat(state, action: PayloadAction<Seat[]>){
            state.listSeat = action.payload;
        }
    }
})