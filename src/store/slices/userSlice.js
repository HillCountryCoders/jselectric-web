import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    storeUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { storeUser } = userSlice.actions;

export default userSlice.reducer;
