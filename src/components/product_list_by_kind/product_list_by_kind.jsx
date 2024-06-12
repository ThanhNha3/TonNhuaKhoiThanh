import React, { useState, useEffect, useContext } from "react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "../cards/product_card";
import { dataContext } from "../provider/provider";

export default function ProductListByKind(data) {
  const { newProducts } = useContext(dataContext);
  const { products, kind } = data;
  const [productList, setProductList] = useState([]);

  let featuredProducts = products.filter((product) => product[kind] === true);

  let saleProducts = products.filter((product) => product.on_sale === true);

  useEffect(() => {
    switch (kind) {
      case "featured": {
        setProductList(featuredProducts);
        break;
      }
      case "new": {
        setProductList(newProducts);
        break;
      }
      case "sale": {
        setProductList(saleProducts);
        break;
      }
      default: {
        setProductList(products);
        break;
      }
    }
  }, [kind, products]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 pr-4">
        {productList.map((product) => (
          <ProductCard {...product} key={product.id} parentPage="home" />
        ))}
      </div>
    </>
  );
}
