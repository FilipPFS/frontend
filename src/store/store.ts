import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import slideSlice from "../features/sliderSlice";
import productReducer from "../features/productSlice";
import topProductReducer from "../features/topProductSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    slider: slideSlice.reducer,
    products: productReducer,
    topProduct: topProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
