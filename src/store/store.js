import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer
        // TODO: add more reducers depending upon use cases
    }
})

export default store


