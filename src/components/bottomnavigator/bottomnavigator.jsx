import React, { useState } from "react";
import { BottomNavigation, Icon, useNavigate } from "zmp-ui";
import { openChat } from "zmp-sdk/apis";

const openChatScreen = () => {
  openChat({
    type: "oa",
    id: "932217208011499778",
    message: "Xin Chào",
    success: () => {
    },
    fail: (err) => {
    },
  });
  openChat()
};

const BottomNavigator = (props) => {
  const [activeTab, setActiveTab] = useState("chat");
  const navigate = useNavigate();
  return (
    <BottomNavigation
      fixed
      activeKey={activeTab}
      onChange={(key) => setActiveTab(key)}
      style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px -4px 12px" }}
    >
      <BottomNavigation.Item
        key="chat"
        label="Trang Chủ"
        icon={<Icon icon="zi-home" />}
        onClick={() => navigate("/")}
        activeIcon={<Icon icon="zi-home" />}
      />
      <BottomNavigation.Item
        label="Danh mục"
        key="category"
        onClick={() => navigate("/category")}
        icon={<Icon icon="zi-search" />}
        activeIcon={<Icon icon="zi-search" />}
      />
      <BottomNavigation.Item
        onClick={openChatScreen}
        label="Chat ngay"
        key="discovery"
        icon={<Icon icon="zi-chat" />}
        activeIcon={<Icon icon="zi-chat-solid" />}
      />
      <BottomNavigation.Item
        key="timeline"
        label="Liên hệ"
        onClick={() => navigate("/contact")}
        icon={<Icon icon="zi-call" />}
        activeIcon={<Icon icon="zi-call-solid" />}
      />
    </BottomNavigation>
  );
};

export default BottomNavigator;
