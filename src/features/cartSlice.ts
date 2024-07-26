import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export type CartProduct = {
  productId: string;
  img: string;
  title: string;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
};

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};

const userId = localStorage.getItem("userId");

export const fetchCartItems = createAsyncThunk(
  "products/fetchCartItems",
  async () => {
    const response: AxiosResponse<CartProduct[]> = await axios.get(
      `http://localhost:5000/api/cart/${userId}`
    );
    return response.data;
  }
);

export const addCartItem = createAsyncThunk<
  CartProduct,
  CartProduct,
  { rejectValue: string }
>("cart/addCartItem", async (item, { rejectWithValue }) => {
  if (!userId) {
    return item;
  }

  console.log("Posting the item", item);

  try {
    const response = await axios.post(
      `http://localhost:5000/api/cart/${userId}`,
      item
    );

    console.log(response);

    const { lastAddedItem } = response.data;

    return lastAddedItem;
  } catch (error: unknown) {
    if (isErrorResponse(error)) {
      return rejectWithValue(error.response.data.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
});

function isErrorResponse(error: unknown): error is ErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as ErrorResponse).response.data.message === "string"
  );
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        productId: string;
        img: string;
        title: string;
        price: number;
        quantity: number;
      }>
    ) {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
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
        (item) => item.productId === action.payload
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          state.items = state.items.filter(
            (item) => item.productId !== action.payload
          );
        }
      }
    },
    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingProduct = state.items.find(
        (item) => item.productId === productId
      );
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addCartItem.fulfilled,
        (state, action: PayloadAction<CartProduct>) => {
          state.status = "succeeded";
          const existingItem = state.items.find(
            (item) => item.productId === action.payload.productId
          );
          if (existingItem) {
            existingItem.quantity++;
          } else {
            state.items.push(action.payload);
          }
        }
      )
      .addCase(addCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default cartSlice;
