import React, { createContext, useEffect, useState } from "react";
import { getUserInfo } from "zmp-sdk/apis";
export const dataContext = createContext(null);

const Provider = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  const formatCurrencyRange = (priceRange) => {
    if (!priceRange) return "Invalid input";
    const prices = priceRange.split("-").map(Number);
    if (prices.some(isNaN)) return "Invalid input";
    const formattedPrices = prices.map((price) =>
      price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
    return formattedPrices.length === 1
      ? `${formattedPrices[0]} ₫`
      : `${formattedPrices[0]} - ${formattedPrices[1]} ₫`;
  };

  const getAllProducts = async () => {
    try {
      let page = 1;
      while (true) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}?per_page=10&page=${page}`,
          {
            method: "GET",
            headers: {
              Authorization:
                "Basic " +
                btoa(
                  `${import.meta.env.VITE_CONSUMER_KEY}:${
                    import.meta.env.VITE_CONSUMER_SECRET
                  }`
                ),
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (data.length === 0) {
          return products;
        } else {
          setProducts((prev) => [...prev, ...data]);
          page += 1;
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const getNewProduct = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}?order=desc&orderby=date&per_page=10`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Basic " +
              btoa(
                `${import.meta.env.VITE_CONSUMER_KEY}:${
                  import.meta.env.VITE_CONSUMER_SECRET
                }`
              ),
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setNewProducts((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    Promise.all([getUserInfo({}), getAllProducts(), getNewProduct()]).then(
      (response) => {
        setUserInfo(response[0]);
      }
    );
  }, []);

  const payload = {
    userInfo,
    products,
    newProducts,
    formatCurrencyRange,
  };

  return (
    <dataContext.Provider value={payload}>
      {props.children}
    </dataContext.Provider>
  );
};

export default Provider;
