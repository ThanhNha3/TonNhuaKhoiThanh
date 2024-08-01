import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProductNew = createAsyncThunk(
  "users/fetchAllProductNew",
  async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}?order=desc&orderby=date&per_page=10`,
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

export const productNewSlice = createSlice({
  name: "productNew",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductNew.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductNew.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProductNew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const {} = productNewSlice.actions;
export default productNewSlice.reducer;
