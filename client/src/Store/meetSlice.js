import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    datetimes: [],
    weather: [],
    location: null,
    title: "",
    description: ""
};

const meetSlice = createSlice({
    name: 'meet',
    initialState,
    reducers: {
        setMeet(state, action) {
            state.title = action.payload.title || "";
            state.datetimes = action.payload.datetimes || [];
            state.weather = action.payload.weather ||  [];
            state.location = action.payload.location || null;
            state.description = action.payload.description || "";
        },
    }
});

export const { setMeet } = meetSlice.actions;

export default meetSlice.reducer;