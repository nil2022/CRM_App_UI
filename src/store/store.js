import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import userReducer from './userDataSlice'
import ticketsReducer from "./ticketsDataSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        // TODO: add more reducers depending upon use cases
        data : userReducer,
        tickets: ticketsReducer
    }
})

export default store


