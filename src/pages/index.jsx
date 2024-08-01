import React, { Suspense, lazy, useContext } from "react";
import { Header, Box, Text } from "zmp-ui";

import BottomNavigator from "../components/bottomnavigator/bottomnavigator";
import CountDownBox from "../components/countdown_box/countdown_box";

import { dataContext } from "../components/provider/provider";
import Logo from "../../assets-src/logo.png";
import Banner from "../components/banner/banner";
import FlashsaleImage from "../../public/images/flashsaleimg.png";
import SpinnerLoader from "../components/spinner/spinner";

const ProductListByKind = lazy(() =>
  import("../components/product_list_by_kind/product_list_by_kind")
);
const HomePage = () => {
  const { products } = useContext(dataContext);

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
            <ProductListByKind products={products} kind="sale" />
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
            <ProductListByKind products={products} kind="featured" />
          </Suspense>
        </Box>
        <Box pl={4} flex flexDirection="column" className="gap-2">
          <Text.Title>Sản phẩm mới</Text.Title>
          <Suspense
            fallback={
              <Box className="flex justify-center">
                <SpinnerLoader />
              </Box>
            }
          >
            <ProductListByKind products={products} kind="new" />
          </Suspense>
        </Box>
      </Box>
      <BottomNavigator />
    </Box>
  );
};

export default HomePage;
