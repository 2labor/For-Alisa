// src/store/distanceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  distance: 0,
};

const distanceSlice = createSlice({
  name: "distance",
  initialState,
  reducers: {
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
    incrementDistance: (state) => {
      state.distance += 300;
    },
  },
});

export const { setDistance, incrementDistance } = distanceSlice.actions;

export default distanceSlice.reducer;
