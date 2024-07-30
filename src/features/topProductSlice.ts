import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { FormOffer, TopProduct } from "../topProducts";

interface TopProductState {
  topProducts: TopProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: TopProductState = {
  topProducts: [],
  status: "idle",
  error: null,
};

export const fetchTopProducts = createAsyncThunk(
  "topProducts/fetchTopProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/api/topProduct");
    return response.data;
  }
);

const token = localStorage.getItem("token");

export const addTopOffer = createAsyncThunk(
  "products/addProduct",
  async (newProduct: FormOffer) => {
    try {
      const response: AxiosResponse<TopProduct> = await axios.post(
        "http://localhost:5000/api/topProduct",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateTopOffer = createAsyncThunk(
  "products/updateTopProduct",
  async (payload: { id: string; updatedOffer: FormOffer }) => {
    try {
      const response: AxiosResponse<TopProduct> = await axios.put(
        `http://localhost:5000/api/topProduct/${payload.id}`,
        payload.updatedOffer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteTopOffer = createAsyncThunk(
  "topProducts/deleteTopProduct",
  async (productId: string) => {
    await axios.delete(`http://localhost:5000/api/topProduct/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return productId;
  }
);

const topProductSlice = createSlice({
  name: "topProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topProducts = action.payload;
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTopOffer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addTopOffer.fulfilled,
        (state, action: PayloadAction<TopProduct | undefined>) => {
          console.log("This is the action payload", action.payload);
          state.topProducts.push(action!.payload!);
          state.status = "succeeded";
        }
      )
      .addCase(addTopOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add product";
      })
      .addCase(
        deleteTopOffer.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.topProducts = state.topProducts.filter(
            (product) => product._id !== action.payload
          );
        }
      )
      .addCase(deleteTopOffer.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete product";
      })
      .addCase(updateTopOffer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateTopOffer.fulfilled,
        (state, action: PayloadAction<TopProduct | undefined>) => {
          state.status = "succeeded";
          if (action.payload) {
            const index = state.topProducts.findIndex(
              (product) => product._id === action!.payload!._id
            );
            if (index !== -1) {
              state.topProducts[index] = action.payload;
            }
          }
        }
      )
      .addCase(updateTopOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update product";
      });
  },
});

export default topProductSlice.reducer;
