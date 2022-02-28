import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	email: "",
	firstName: "",
	lastName: "",
	fullName: "",
	token: null,
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			state.email = action.payload.email || ""
			state.fullName = action.payload.fullName || ""
			state.firstName = action.payload.firstName || ""
			state.lastName = action.payload.lastName || ""
			state.token = action.payload.token || null
		},
	},
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
