import React, { ElementType, useState } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  User,
  BarChart2,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface NavLink {
  path: string;
  label: string;
  icon: ElementType;
}
const navLinks: NavLink[] = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/analytics", label: "Analytics", icon: BarChart2 },
];

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "light" : "dark"
    );
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <Container>
      <Sidebar $isOpen={sidebarOpen}>
        <SidebarContent>
          {navLinks.map(({ path, label, icon: Icon }) => (
            <NavItem key={path} onClick={() => handleNavigation(path)}>
              <Icon size={20} />
              {label}
            </NavItem>
          ))}
          <NavItem onClick={logout}>
            <LogOut size={20} /> Logout
          </NavItem>
        </SidebarContent>
      </Sidebar>

      <Main $sidebarOpen={sidebarOpen}>
        <Header>
          <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </MenuButton>
          <MenuButton onClick={toggleTheme}>
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </MenuButton>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Container>
  );
};

export default Layout;

// Styles
const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside<{ $isOpen: boolean }>`
  width: ${({ $isOpen }) => ($isOpen ? "240px" : "0")};
  background: var(--sidebar-bg);
  transition: width 0.3s ease;
  overflow: hidden;
  position: fixed;
  height: 100vh;
  z-index: 1000;

  @media (max-width: 768px) {
    width: ${({ $isOpen }) => ($isOpen ? "100%" : "0")};
  }
`;

const SidebarContent = styled.div`
  padding: 1rem;
  width: 240px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;

  &:hover {
    background: var(--hover-bg);
  }

  svg {
    margin-right: 0.75rem;
  }
`;

const Main = styled.main<{ $sidebarOpen: boolean }>`
  flex: 1;
  margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? "240px" : "0")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--header-bg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  color: var(--text-primary);
`;

const Content = styled.div`
  padding: 2rem;
`;
