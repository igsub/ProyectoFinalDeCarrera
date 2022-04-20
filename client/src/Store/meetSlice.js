import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	datetimes: [],
	weather: [],
	location: null,
	title: "",
	description: "",
	currentDate: null,
	currentTimes: [],
	datetimesByUser: [],
}

const meetSlice = createSlice({
	name: "meet",
	initialState,
	reducers: {
		setMeet(state, action) {
			state.title = action.payload.title || ""
			state.datetimes = action.payload.datetimes || []
			state.weather = action.payload.weather || []
			state.location = action.payload.location || null
			state.description = action.payload.description || ""
			state.currentDate = action.payload.currentDate || null
			state.currentTimes = action.payload.currentTimes || []
			state.datetimesByUser = action.payload.datetimesByUser || []
		},
	},
})

export const { setMeet } = meetSlice.actions

export default meetSlice.reducer
