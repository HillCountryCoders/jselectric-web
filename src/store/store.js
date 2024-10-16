import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import userSlice from "./slices/userSlice";
import chatSlice from "./slices/chatSlice";
import allChatSlice from "./slices/allChatSlice";
import notificationSlice from "./slices/notification";
import refreshChatSlice from "./slices/refreshChat";
const isClient = typeof window !== "undefined";
let persistedReducer;
if (isClient) {
  const persistConfig = {
    key: "root",
    storage: storage,
  };
  const rootReducers = combineReducers({
    user: userSlice,
    currentChat: chatSlice,
    allChats: allChatSlice,
    notification: notificationSlice,
    refreshChat: refreshChatSlice,
  });
  persistedReducer = persistReducer(persistConfig, rootReducers);
} else {
  persistedReducer = combineReducers({
    user: userSlice,
    chats: chatSlice,
    notification: notificationSlice,
    refreshChat: refreshChatSlice,
  });
}
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger, thunk],
});
export const persistor = persistStore(store);
