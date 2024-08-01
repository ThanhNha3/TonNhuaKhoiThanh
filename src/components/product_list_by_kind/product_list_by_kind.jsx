import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "../cards/product_card";

export default function ProductListByKind(data) {
  const { products } = data;
  return (
    <>
      <div className="grid grid-cols-2 gap-4 pr-4">
        {products.map((product) => (
          <ProductCard {...product} key={product.id} parentPage="home" />
        ))}
      </div>
    </>
  );
}
