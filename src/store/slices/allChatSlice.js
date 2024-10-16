import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  allChats: [],
};
export const allChatSlice = createSlice({
  name: "allChat",
  initialState: INITIAL_STATE,
  reducers: {
    storeAllChat: (state, action) => {
      state.allChats = action.payload;
    },
  },
});
export const { storeAllChat } = allChatSlice.actions;
export default allChatSlice.reducer;
