import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  notification: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: INITIAL_STATE,
  reducers: {
    storeNotification: (state, action) => {
      state.notification = !action.payload;
    },
  },
});

export const { storeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
