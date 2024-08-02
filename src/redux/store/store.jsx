import { configureStore } from "@reduxjs/toolkit";

import categorySlice from "../slices/category/category";
import productFeaturedSlice from "../slices/product_featured/product_featured";
import productNewSlice from "../slices/product_new/product_new";
import productOnSaleSlice from "../slices/product_onsale/product_onsale";

const Store = configureStore({
  reducer: {
    productFeatured: productFeaturedSlice,
    productNew: productNewSlice,
    productOnSale: productOnSaleSlice,
    categories: categorySlice,
  },
});

export default Store;
