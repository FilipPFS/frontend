import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import slideSlice from "../features/sliderSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    slider: slideSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
