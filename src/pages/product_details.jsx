import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { Box, Header, Icon, List, Text, Button } from "zmp-ui";
import { openShareSheet } from "zmp-sdk/apis";
import { openChat } from "zmp-sdk/apis";

import ProductDetailsListImage from "../components/product_details_list_image/product_details_list_image";
import { dataContext } from "../components/provider/provider";
import ShowDescription from "../components/show_description/show_description";
import OrderForm from "../components/form_order/form_order";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, formatCurrencyRange } = useContext(dataContext);
  const [showModalOrder, setShowModalOrder] = useState(false);
  const product = products.find((item) => item.id === Number(id));

  const handleShare = () => {
    openShareSheet({
      type: "zmp",
      data: {
        title: "Chia sẻ đến với mọi người",
        thumbnail:
          "https://khoithanhgroup.com/wp-content/uploads/2023/09/banner-1-1024x373.jpg",
      },
      success: (res) => {},
      fail: (err) => {},
    });
  };

  const openChatScreen = (product_name) => {
    openChat({
      type: "oa",
      id: "932217208011499778",
      message: `Xin chào, tôi cần tư vấn về sản phẩm ${product_name}`,
      success: () => {},
      fail: (err) => {},
    });
    openChat();
  };

  return (
    <Box>
      <Header className="header-sticky" title="Chi tiết sản phẩm"></Header>
      <Box>
        <ProductDetailsListImage images={product.images} />
        <Box>
          <Box
            p={4}
            flex
            flexDirection="column"
            className="gap-2 bg-[var(--white-color)]"
          >
            <Text.Title>{product.name}</Text.Title>
            <Text.Title className="text-[var(--primary-color)]">
              {formatCurrencyRange(product.price)}
            </Text.Title>
          </Box>
          <Box p={4}>
            <Box className="bg-[var(--primary-color)] rounded-md">
              <List>
                <List.Item
                  onClick={handleShare}
                  title="Chia sẻ ngay cho bạn bè"
                  prefix={<Icon icon="zi-share-solid" />}
                  suffix={<Icon icon="zi-chevron-right" />}
                  className="text-[var(--white-color)]"
                ></List.Item>
              </List>
            </Box>
          </Box>
          <Box
            flex
            flexDirection="column"
            className="bg-[var(--white-color)] gap-2"
            p={4}
          >
            <Text.Title>Chi tiết sản phẩm</Text.Title>
            <ShowDescription htmlContent={product.description} />
          </Box>
        </Box>
      </Box>
      <Box
        p={4}
        className="fixed bottom-0 bg-[var(--white-color)] w-full gap-2"
        flex
        justifyContent="flex-end"
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px -4px 12px" }}
      >
        <Button
          onClick={() => openChatScreen(product.name)}
          size="large"
          prefixIcon={<Icon icon="zi-chat-solid" />}
          style={{
            border: "var(--primary-color) solid 1px",
            color: "var(--primary-color)",
            background: "var(--white-color)",
            borderRadius: "10px",
          }}
        >
          Chat ngay
        </Button>
        <Button
          onClick={() => setShowModalOrder(true)}
          style={{
            color: "var(--white-color)",
            background: "var(--primary-color)",
            borderRadius: "10px",
          }}
        >
          Đặt hàng
        </Button>
      </Box>
      <OrderForm
        showModalOrder={showModalOrder}
        setShowModalOrder={setShowModalOrder}
        productId={product.id}
        productName={product.name}
      />
    </Box>
  );
};

export default ProductDetails;
