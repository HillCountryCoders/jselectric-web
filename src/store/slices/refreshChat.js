import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  refreshChat: false,
};

export const refreshChatSlice = createSlice({
  name: "refreshChat",
  initialState: INITIAL_STATE,
  reducers: {
    storeRefreshChat: (state, action) => {
      state.refreshChat = !action.payload;
    },
  },
});

export const { storeRefreshChat } = refreshChatSlice.actions;
export default refreshChatSlice.reducer;
