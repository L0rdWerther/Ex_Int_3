import React, { useState } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import { MenuOutlined, UserAddOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Outlet, Link, useLocation } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export default function MainLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      key: "/cadastrar",
      icon: <UserAddOutlined />,
      label: <Link to="/cadastrar" onClick={() => setDrawerOpen(false)}>Cadastrar</Link>,
    },
    {
      key: "/listar",
      icon: <UnorderedListOutlined />,
      label: <Link to="/listar" onClick={() => setDrawerOpen(false)}>Listar</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
          Sistema CRUD POO
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1, justifyContent: "flex-end", display: "flex" }}
          className="desktop-menu"
        />

        <Button
          type="text"
          icon={<MenuOutlined style={{ color: "#fff", fontSize: 20 }} />}
          onClick={() => setDrawerOpen(true)}
          className="mobile-menu-btn"
        />

        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
        >
          <Menu mode="vertical" selectedKeys={[location.pathname]} items={menuItems} />
        </Drawer>
      </Header>

      <Content style={{ padding: "24px", maxWidth: 1000, width: "100%", margin: "0 auto" }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Exercício Integrador 03 - Desenvolvimento Web & POO
      </Footer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </Layout>
  );
}
