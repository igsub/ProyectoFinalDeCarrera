import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    email: "",
    firstName: "",
    lastName: "",
    fullName: "",
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email || "";
            state.firstName = action.payload.firstName || "";
            state.lastName = action.payload.lastName || "";
            state.fullName = action.payload.fullName || "";
        }
    }
})