import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import slideSlice from "../features/sliderSlice";
import productReducer from "../features/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    slider: slideSlice.reducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
