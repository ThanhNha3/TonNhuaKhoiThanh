import React from "react";
import { Box, Text } from "zmp-ui";

const CategoryCard = (data) => {
  const {
    id,
    image,
    count,
    _links,
    name,
    slug,
    parent,
    description,
    display,
    activeCategory,
    menu_order,
    setActiveCategory,
  } = data;

  return (
    <Box
      pt={2}
      flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width={80}
      style={
        id === activeCategory
          ? {
              borderBottom: "var(--primary-color) solid 4px",
              background: "var(--white-color)",
              borderRadius: "10px",
            }
          : {}
      }
      onClick={() => setActiveCategory(id)}
    >
      <Box width={50} height={50}>
        <img
          className="w-full h-full object-fit"
          src="https://khoithanhgroup.com/wp-content/uploads/2022/10/chac-4-ton-nhua-pvc-1-350x350.jpg"
          alt={name}
        />
      </Box>
      <Box height={70} className="overflow-hidden text-center ">
        <Text
          className={
            id === activeCategory
              ? "sub-title"
              : "transition-alltext-[var(--text-disable)]"
          }
        >
          {name}
        </Text>
      </Box>
    </Box>
  );
};

export default CategoryCard;
