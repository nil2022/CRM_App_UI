import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            /** Set auth status true when user login successfully */
            state.status = true;
            
            const userData = action.payload;
            console.log('userData: (in authSlice)', userData)
            state.userData = userData;
        },

        // token: (state, action) => {
        //     state.token = action.payload
        // },

        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login, token, logout} = authSlice.actions;

export default authSlice.reducer;
