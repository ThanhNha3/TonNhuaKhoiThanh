import React from "react";
import { Box, Text } from "zmp-ui";

const HomeProductList = (props) => {
  const { title, products, Card } = props;
  return (
    <Box flex flexDirection="column" className="gap-2">
      <Text.Title>{title}</Text.Title>
      <Box className="overflow-scroll">
        <Box flex className="gap-4 w-max">
          {products.map((product) => (
            <Card key={product.id} {...product}></Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeProductList;
