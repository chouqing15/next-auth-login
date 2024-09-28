"use client";

import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Form, Input, Layout, Modal, theme } from "antd";
import useLoginStore from "@/store/loginStore";
import { signIn, signOut, useSession } from "next-auth/react";

const { Header } = Layout;
export default function Nav() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data: session } = useSession();

  const setOpen = useLoginStore((state) => state.setOpen);
  const open = useLoginStore((state) => state.open);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [form] = Form.useForm();

  return (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }} className="flex justify-between items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />

        <Button
          className="mr-3"
          onClick={() => {
            if (session?.user) {
              signOut();
            } else {
              setOpen(true);
            }
          }}>
          {session?.user ? "sign out" : "sign in"}
          {JSON.stringify(session)}
        </Button>
      </Header>

      <Modal title="Basic Modal" open={open} onOk={() => signIn("credentials", {})} onCancel={() => setOpen(false)}>
        <Form {...layout} form={form} name="control-hooks" style={{ maxWidth: 600 }}>
          <Form.Item name="note" label="Note" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
