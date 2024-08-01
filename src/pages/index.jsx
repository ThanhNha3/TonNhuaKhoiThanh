import { Header, Box, Text } from "zmp-ui";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import BottomNavigator from "../components/bottomnavigator/bottomnavigator";
import CountDownBox from "../components/countdown_box/countdown_box";
import Logo from "../../assets-src/logo.png";
import Banner from "../components/banner/banner";
import FlashsaleImage from "../../public/images/flashsaleimg.png";
import LoadingComponent from "../components/loading/loading";
import ProductListByKind from "../components/product_list_by_kind/product_list_by_kind"

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
  const productsOnSaleStatus = useSelector(
    (state) => state.productOnSale.loading
  );
  const productFeaturedStatus = useSelector(
    (state) => state.productFeatured.loading
  );
  const productNewStatus = useSelector((state) => state.productNew.loading);

  const { productsOnSale, productFeatured, productNew } =
    useSelector(productHomeSelector);

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
          {productsOnSaleStatus ? (
            <LoadingComponent />
          ) : (
            <ProductListByKind products={productsOnSale} />
          )}
        </Box>
        <Box pl={4} flex flexDirection="column" className="gap-2">
          <Text.Title>Sản phẩm nổi bật</Text.Title>
          {productFeaturedStatus ? (
            <LoadingComponent />
          ) : (
            <ProductListByKind products={productFeatured} />
          )}
          {/* <Suspense fallback={<LoadingComponent />}>
            <ProductListByKind products={productFeatured} />
          </Suspense> */}
        </Box>
        <Box pl={4} flex flexDirection="column" className="gap-2">
          <Text.Title>Sản phẩm mới</Text.Title>
          {productNewStatus ? (
            <LoadingComponent />
          ) : (
            <ProductListByKind products={productNew} />
          )}
        </Box>
      </Box>
      <BottomNavigator />
    </Box>
  );
};

export default HomePage;
