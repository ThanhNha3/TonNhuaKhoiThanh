import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProductFeatured = createAsyncThunk(
  "users/fetchAllProductFeatured",
  async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}?featured=true`,
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

export const productFeaturedSlice = createSlice({
  name: "productFeatured",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductFeatured.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductFeatured.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProductFeatured.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const {} = productFeaturedSlice.actions;
export default productFeaturedSlice.reducer;
