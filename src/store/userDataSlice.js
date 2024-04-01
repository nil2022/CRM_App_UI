import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allUsersData : []
}

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        allUsersData: (state, action) => {
            state.allUsersData = action.payload
        },
        clearAllUsersData: (state) => {
            state.allUsersData = []
        }
    }
}) 

export const { allUsersData, clearAllUsersData } = userDataSlice.actions;

export default userDataSlice.reducer;