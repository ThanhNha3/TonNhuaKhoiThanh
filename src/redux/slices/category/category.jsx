import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllCategories = createAsyncThunk(
  "users/fetchAllCategories",
  async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
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
    });
    const data = await response.json();
    return data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const {} = categorySlice.actions;
export default categorySlice.reducer;
