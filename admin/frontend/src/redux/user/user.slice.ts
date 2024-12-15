import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserModel } from "./user.state";

export const initialUserState:UserModel = {
    user: {
        _id: "",
        username: "",
        role: "",
    }
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers:{
        setUser_(state, action: PayloadAction<User>){
            state.user = action.payload;
        }
    }
})

export default userSlice;