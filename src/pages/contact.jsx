import React from "react";
import { Box, Text, Header, Icon } from "zmp-ui";

const Contact = () => {
  return (
    <Box className="bg-[var(--white-color)]" pb={4}>
      <Header
        className="header-sticky"
        title={
          <Text size="xLarge" className="sub-title">
            Liên hệ
          </Text>
        }
      ></Header>
      <Box flex className="flex-col gap-8" mt={2}>
        <Box px={4} flex className="flex-col gap-2">
          <Text size="xLarge" className="sub-title">
            Tôn Nhựa Khởi Thành
          </Text>
          <Box p={1} width={100} className="bg-[var(--primary-color)]"></Box>
        </Box>
        <Box px={4} flex className="flex-col gap-2">
          <Text size="xLarge" className="sub-title text-[var(--primary-color)]">
            Về chúng tôi - Tôn Nhựa Khởi Thành
          </Text>
          <Text>
            Tôn Nhựa Khởi Thành là một tổ chức chuyên về sản xuất và cung cấp
            các sản phẩm tôn nhựa, ngói nhựa, phụ kiện,..Với nhiều năm kinh
            nghiệm trong ngành công nghiệp xây dựng, công ty đã xây dựng được
            danh tiếng vững mạnh trong việc cung cấp các sản phẩm tôn nhựa chất
            lượng cao và dịch vụ hỗ trợ kỹ thuật xuất sắc.
          </Text>
        </Box>
        <Box px={4} flex className="flex-col gap-2">
          <Text size="xLarge" className="sub-title text-[var(--primary-color)]">
            Địa chỉ
          </Text>
          <ul className="list-disc px-4 flex flex-col gap-2">
            <li>
              Nhà Máy Sản Xuất: Quốc lộ N2, Xã Hòa Khánh Đông, Đức Hòa, Long An
            </li>
            <li>Chi Nhánh Miền Tây: 459 Võ Văn Kiệt, P2, Sóc Trăng</li>
            <li>
              Chi nhánh miền trung 1 : Thôn Lạc Sơn 2 , Xã Cà Ná , Huyện Thuận
              Nam , Tỉnh Ninh Thuận
            </li>
            <li>
              Chi Nhánh miền trung 2 : Thôn An Lộc , Xã Bình Trị , Huyện Bình
              Sơn , Quãng Ngãi
            </li>
            <li>
              Chi Nhánh Miền Nam : Quốc Lộ 56 Tổ 2, Ấp Bắc 2, Hòa Long, TP Bà
              Rịa Vũng Tàu
            </li>
            <li>Chi Nhánh Miền Bắc: Láng Hạ, Quận Ba Đình, Hà Nội </li>
          </ul>
        </Box>
        <Box px={4} flex className="flex-col gap-2">
          <Text size="xLarge" className="sub-title text-[var(--primary-color)]">
            Chăm sóc khách hàng
          </Text>
          <Box flex className="items-center gap-2">
            <Icon
              className="text-[var(--primary-color)]"
              icon="zi-call-solid"
            />
            <Text className="sub-title">
              <a href="tel:0366999997">0366999997</a>
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
