import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  fullName: "",
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email || "";
      state.name = action.payload.name || "";
      state.fullName = action.payload.fullName || "";
      state.token = action.payload.token || null;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
