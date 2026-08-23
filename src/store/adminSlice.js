import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    adminData: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        login: (state, action) => {
            /** Set auth status true when user login successfully */
            state.status = true;

            const adminData = action.payload;
            state.adminData = adminData;
        },

        logout: (state) => {
            state.status = false;
            state.adminData = null;
        },
    },
});

export const { login, logout } = adminSlice.actions;

export const adminReducer = adminSlice.reducer;