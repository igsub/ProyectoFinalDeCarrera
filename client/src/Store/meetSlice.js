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
        setTitle(state, action) {
            state.title = action.payload
        },
        setDatetimes(state, action) {
            state.datetimes = action.payload
        },
        setWeather(state, action) {
            state.weather = action.payload
        },
        setLocation(state, action) {
            state.location = action.payload
        },
        setDescription(state, action) {
            state.description = action.payload
        }
    }
});

export const { setTitle, setDatetimes, setWeather, setLocation, setDescription } = meetSlice.actions;

export default meetSlice.reducer;