import React from "react";
import { AnimationRoutes, Page } from "zmp-ui";
import { Route } from "react-router-dom";

import HomePage from "../../pages";
import Contact from "../../pages/contact";
import Category from "../../pages/category";
import ProductDetails from "../../pages/product_details";

const Layout = () => {
  return (
    <Page>
      <AnimationRoutes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/category" element={<Category></Category>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route
          path="/product/:id"
          element={<ProductDetails></ProductDetails>}
        ></Route>
      </AnimationRoutes>
    </Page>
  );
};

export default Layout;
