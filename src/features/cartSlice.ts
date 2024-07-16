import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartProduct = {
  id: string;
  img: string;
  title: string;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartProduct[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        id: string;
        img: string;
        title: string;
        price: number;
        quantity: number;
      }>
    ) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },
  },
});

export default cartSlice;
