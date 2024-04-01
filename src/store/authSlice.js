import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    // accessToken: null,
    userData: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            /** Set auth status true when user login successfully */
            state.status = true;
            // ? not storing access token in redux store becoz on reload, it will be null
            // state.accessToken = action.payload.accessToken;
            
            const userData = action.payload;
            // console.log('userData: (in authSlice)', userData)
            state.userData = userData;
        },

        logout: (state) => {
            state.status = false;
            // state.accessToken = null;
            state.userData = null;
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
