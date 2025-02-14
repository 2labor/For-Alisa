import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  isVisible: false,
  type: "success", // Добавляем тип (по умолчанию успех)
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.isVisible = true;
      state.type = action.payload.type || "success"; // Если тип не передан, используется "success"
    },
    hideNotification: (state) => {
      state.isVisible = false;
      state.message = "";
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
