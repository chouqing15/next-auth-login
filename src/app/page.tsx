"use client";

import React from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import useLoginStore from "@/store/loginStore";
import { useRouter } from "next/navigation";

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const open = useLoginStore((state) => state.open);
  const router = useRouter();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={false}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              onClick: () => router.push("/"),
              label: "nav 1",
            },
            {
              key: "2",
              onClick: () => router.push("/nav2"),
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              onClick: () => router.push("/nav3"),
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}>
          Content {`${open}`}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
