// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import distanceReducer from "./slices/distanceSlice"; 
import mailReducer from "./slices/mailsSlice";
import notificationReducer from "./slices/notificationSlice"; 
import checkpointsReducer from "./slices/checkpointsSlice";
const store = configureStore({
  reducer: {
    distance: distanceReducer,
    mail: mailReducer,
    notification: notificationReducer, 
    checkpoints: checkpointsReducer,
  },
});

export default store;
