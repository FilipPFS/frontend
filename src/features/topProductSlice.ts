import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { TopProduct } from "../topProducts";

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
      });
  },
});

export default topProductSlice.reducer;
