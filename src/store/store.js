import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import userReducer from './userDataSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        // TODO: add more reducers depending upon use cases
        data : userReducer
    }
})

export default store


