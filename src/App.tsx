import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { GlobalStyles } from "./styles/GlobalStyles";
import Layout from "./components/Layout";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

/**
 * A higher-order component that protects routes from being accessed by unauthenticated users.
 * It checks the authentication status and conditionally renders the children components or redirects to the login page.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render if the user is authenticated.
 * @returns {JSX.Element} - The rendered component based on the authentication status.
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};
