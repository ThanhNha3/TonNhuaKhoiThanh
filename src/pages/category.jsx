import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Header, Icon, Input, useNavigate, Text } from "zmp-ui";
import CategoryCard from "../components/cards/category_card";
import ProductCard from "../components/cards/product_card";
import { dataContext } from "../components/provider/provider";
import { fetchAllCategories } from "../redux/slices/category/category";

const Category = () => {
  const navigate = useNavigate();
  const { products, dispatch } = useContext(dataContext);

  const categories = useSelector((state) => state.categories.categories);
  const categoryLoadingStatus = useSelector(
    (state) => state.categories.loading
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  const [listProduct, setListProduct] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");
  const [activeCategory, setActiveCategory] = useState();

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[1].id);
    }
  }, [categories]);

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      for (let i = 0; i < product.categories.length; i++) {
        return product.categories[i].id === activeCategory ? product : null;
      }
    });

    setListProduct(filteredProducts);
  }, [activeCategory, products]);

  const search = () => {
    const filteredProducts = products.filter((product) =>
      product.name.toUpperCase().includes(searchProducts.toUpperCase())
    );
    setListProduct(filteredProducts);
  };

  return (
    <Box>
      <Header
        showBackIcon={false}
        className="header-sticky"
        title={
          <Box
            pt={4}
            flex
            alignItems="center"
            justifyContent="space-between"
            className="gap-4"
          >
            <Box onClick={() => navigate(-1)}>
              <Icon icon="zi-home" style={{ fontSize: "30px" }}></Icon>
            </Box>
            <Box className="flex-1 ">
              <Input.Search
                onChange={(e) => {
                  setSearchProducts(e.target.value);
                  search();
                }}
                clearable={true}
                style={{ height: "38px" }}
                className=""
                placeholder="Tìm kiếm sản phẩm..."
              ></Input.Search>
            </Box>
          </Box>
        }
      ></Header>
      <Box className="overflow-scroll" p={4} style={{ height: "164px" }}>
        <Box flex className="gap-4 w-max">
          {categoryLoadingStatus && (
            <Box flex alignItems="center" justifyContent="center">
              <Text className="sub-title">Đang tải...</Text>
            </Box>
          )}
          {!categoryLoadingStatus &&
            categories.map((category) => (
              <CategoryCard
                key={category.id}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                {...category}
              ></CategoryCard>
            ))}
        </Box>
      </Box>
      {listProduct.length > 0 ? (
        <Box
          flex
          flexWrap
          pl={4}
          py={4}
          className="gap-4 bg-[var(--white-color)]"
          style={{ minHeight: "calc(100vh - 287px)" }}
        >
          {listProduct.map((product) => (
            <ProductCard key={product.id} {...product}></ProductCard>
          ))}
        </Box>
      ) : (
        <Box
          className="bg-[var(--white-color)] flex-col gap-2"
          flex
          justifyContent="center"
          alignItems="center"
          style={{ height: "calc(100vh - 287px)" }}
        >
          <Icon icon="zi-note-delete" size={36} />
          <Text size="xLarge" className="sub-title">
            Không tìm thấy sản phẩm
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Category;
