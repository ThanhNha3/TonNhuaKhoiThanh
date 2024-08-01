import React, { Suspense, lazy, useContext, useEffect, useRef } from "react";
import { Header, Box, Text } from "zmp-ui";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import BottomNavigator from "../components/bottomnavigator/bottomnavigator";
import CountDownBox from "../components/countdown_box/countdown_box";
import { dataContext } from "../components/provider/provider";
import Logo from "../../assets-src/logo.png";
import Banner from "../components/banner/banner";
import FlashsaleImage from "../../public/images/flashsaleimg.png";
import SpinnerLoader from "../components/spinner/spinner";
import { fetchAllProductOnSale } from "../redux/slices/product_onsale/product_onsale";
import { fetchAllProductFeatured } from "../redux/slices/product_featured/product_featured";
import { fetchAllProductNew } from "../redux/slices/product_new/product_new";

const ProductListByKind = lazy(() =>
  import("../components/product_list_by_kind/product_list_by_kind")
);

const productsOnSale = (state) => state.productOnSale.products;
const productFeatured = (state) => state.productFeatured.products;
const productNew = (state) => state.productNew.products;

const productHomeSelector = createSelector(
  [productsOnSale, productFeatured, productNew],
  (productsOnSale, productFeatured, productNew) => ({
    productsOnSale,
    productFeatured,
    productNew,
  })
);

const HomePage = () => {
  const { dispatch } = useContext(dataContext);
  const { productsOnSale, productFeatured, productNew } =
    useSelector(productHomeSelector);
  const targetRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllProductOnSale());
    dispatch(fetchAllProductFeatured());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            dispatch(fetchAllProductNew());
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <Box style={{ paddingBottom: "50px" }}>
      <Header
        className="header-sticky"
        style={{
          borderBottom: "var(--background-grey) solid 1px",
          background: "var(--primary-color)",
        }}
        showBackIcon={false}
        title={
          <Box width={100}>
            <img className="w-full h-full object-fit" src={Logo} />
          </Box>
        }
      />
      <Box p={4}>
        <Banner />
      </Box>
      <Box
        flex
        flexDirection="column"
        className="gap-4 bg-[var(--white-color)]"
        py={4}
      >
        <Box pl={4} flex flexDirection="column" className="gap-2">
          <Box pr={4} flex justifyContent="space-between" alignItems="center">
            <Box style={{ width: "max-content", height: "50px" }}>
              <img className="w-full h-full object-fill" src={FlashsaleImage} />
            </Box>
            <CountDownBox />
          </Box>
          <Suspense
            fallback={
              <Box className="flex justify-center">
                <SpinnerLoader />
              </Box>
            }
          >
            <ProductListByKind products={productsOnSale} />
          </Suspense>
        </Box>
        <Box pl={4} flex flexDirection="column" className="gap-2">
          <Text.Title>Sản phẩm nổi bật</Text.Title>
          <Suspense
            fallback={
              <Box className="flex justify-center">
                <SpinnerLoader />
              </Box>
            }
          >
            <ProductListByKind products={productFeatured} />
          </Suspense>
        </Box>
        <Box
          ref={targetRef}
          pl={4}
          flex
          flexDirection="column"
          className="gap-2"
        >
          <Text.Title>Sản phẩm mới</Text.Title>
          <Suspense
            fallback={
              <Box className="flex justify-center">
                <SpinnerLoader />
              </Box>
            }
          >
            <ProductListByKind products={productNew} />
          </Suspense>
        </Box>
      </Box>
      <BottomNavigator />
    </Box>
  );
};

export default HomePage;
