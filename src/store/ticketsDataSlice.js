import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ticketsData: null,
};

const ticketsDataSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        ticketsData: (state, action) => {
            state.ticketsData = action.payload;
        },
        clearAllTicketsData: (state) => {
            state.ticketsData = null;
        },
    },
});

export const { ticketsData, clearAllTicketsData } = ticketsDataSlice.actions;

export default ticketsDataSlice.reducer;
