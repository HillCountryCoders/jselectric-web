import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  currentChat: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: INITIAL_STATE,
  reducers: {
    storeCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const { storeCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;
