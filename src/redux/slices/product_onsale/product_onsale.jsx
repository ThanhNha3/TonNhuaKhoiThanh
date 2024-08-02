import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProductOnSale = createAsyncThunk(
  "users/fetchAllProductOnSale",
  async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}?on_sale=true`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Basic " +
            btoa(
              `${import.meta.env.VITE_CONSUMER_KEY}:${
                import.meta.env.VITE_CONSUMER_SECRET
              }`
            ),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

export const productOnSaleSlice = createSlice({
  name: "productOnSale",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductOnSale.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductOnSale.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProductOnSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const {} = productOnSaleSlice.actions;
export default productOnSaleSlice.reducer;
