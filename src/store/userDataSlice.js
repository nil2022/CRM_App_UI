import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usersData : null
}

const userDataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        usersData: (state, action) => {
            state.usersData = action.payload
        },
        clearAllUsersData: (state) => {
            state.usersData = null
        }
    }
}) 

export const { usersData, clearAllUsersData } = userDataSlice.actions;

export default userDataSlice.reducer;