import { configureStore } from "@reduxjs/toolkit";
import meetReducer from './meetSlice'
import userReducer from './userSlice'

const store = configureStore({
    reducer: { 
        meet: meetReducer,
        user: userReducer
    }
});

export default store;