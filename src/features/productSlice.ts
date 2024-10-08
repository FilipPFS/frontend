import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { FormProduct, Product } from "../products";

interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

const token = localStorage.getItem("token");

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response: AxiosResponse<Product[]> = await axios.get(
      "http://localhost:5000/api/product"
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string) => {
    await axios.delete(`http://localhost:5000/api/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return productId;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct: FormData) => {
    try {
      const response: AxiosResponse<Product> = await axios.post(
        "http://localhost:5000/api/product",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (payload: { id: string; updatedProduct: FormData }) => {
    try {
      const response: AxiosResponse<Product> = await axios.put(
        `http://localhost:5000/api/product/${payload.id}`,
        payload.updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.products = state.products.filter(
            (product) => product._id !== action.payload
          );
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete product";
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product | undefined>) => {
          console.log("This is the action payload", action.payload);
          state.products.push(action!.payload!);
          state.status = "succeeded";
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add product";
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product | undefined>) => {
          state.status = "succeeded";
          if (action.payload) {
            const index = state.products.findIndex(
              (product) => product._id === action!.payload!._id
            );
            if (index !== -1) {
              state.products[index] = action.payload;
            }
          }
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update product";
      });
  },
});
export default productSlice.reducer;
