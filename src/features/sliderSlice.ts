import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slideSlice = createSlice({
  name: "slide",
  initialState: { currentIndex: 0 },
  reducers: {
    increment(state, action: PayloadAction) {
      state.currentIndex++;
    },
    decrement(state, action: PayloadAction) {
      state.currentIndex--;
    },
    setIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },
  },
});

export const slideActions = slideSlice.actions;

export default slideSlice;
