import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserModel } from "./user.state";

export const initialUserState:UserModel = {
    user: {
        _id: "",
        name: "",
        phone: "",
        email: "",
        listSeat: []
    }
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers:{
        setUser(state, action: PayloadAction<User>){
            state.user = action.payload;
        }
    }
})

export default userSlice;