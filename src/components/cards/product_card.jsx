import React, { useContext, useEffect, useState } from "react";
import { Box, Text, useNavigate } from "zmp-ui";
import { dataContext } from "../provider/provider";
import "../../css/app.css";

const ProductCard = (data) => {
  const { formatCurrencyRange } = useContext(dataContext);
  const navigate = useNavigate();
  const {
    id,
    name,
    images,
    price,
    parentPage,
    sale_price,
    on_sale,
    regular_price,
  } = data;
  const image = images[0].src;

  const [amountSold, setAmountSold] = useState(0);
  const [amountSoldGreenNamed, setAmountSoldGreenNamed] = useState(0);

  useEffect(() => {
    setAmountSold(() => {
      return Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    });
    setAmountSoldGreenNamed(() => {
      return Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000;
    });
  }, []);

  return (
    <Box
      onClick={() => navigate(`/product/${id}`)}
      width={parentPage === "home" ? "100%" : "calc(50% - 16px)"}
      flex
      pb={2}
      flexDirection="column"
      className="gap-2 rounded-md overflow-hidden"
      style={{
        border: "var(--background-grey) solid 1px",
        height: "max-content",
      }}
    >
      <Box className="w-full h-full" height={150}>
        <img className="w-full h-full" src={image} alt={name} />
      </Box>
      <Box flex flexDirection="column" px={2} className="">
        <Box>
          <Text className="text-wrap">{name}</Text>
        </Box>
        {on_sale === true ? (
          <Box flex justifyContent="space-between" alignItems="center" pt={2}>
            <Box className="line-through text-xs">
              {formatCurrencyRange(regular_price)}
            </Box>
            <Box className="sub-title text-lg">
              {formatCurrencyRange(sale_price)}
            </Box>
          </Box>
        ) : (
          <Box className="sub-title" pt={2}>
            {formatCurrencyRange(price)}
          </Box>
        )}
        <Box>
          Đã bán {name.includes("xanh") ? amountSoldGreenNamed : amountSold}{" "}
          lượt
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
