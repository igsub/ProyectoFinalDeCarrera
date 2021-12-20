import { configureStore } from "@reduxjs/toolkit";
import meetReducer from './meetSlice'

const store = configureStore({
    reducer: { 
        meet: meetReducer
    }
});

export default store;