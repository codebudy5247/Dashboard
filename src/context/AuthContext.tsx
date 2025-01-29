import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AuthState, AuthContextType, User } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const MOCK_USER = {
  email: "aditya@example.com",
  password: "password123",
  name: "Aditya Shekhar",
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "UPDATE_PROFILE"; payload: Partial<User> };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
        loading: false,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        loading: false,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const { getItem, setItem, removeItem } = useLocalStorage("user");

  useEffect(() => {
    const storedUser = getItem();
    if (storedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(storedUser) });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        const user = { email: MOCK_USER.email, name: MOCK_USER.name };
        setItem(JSON.stringify(user));
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR", payload: (error as Error).message });
    }
  };

  const logout = () => {
    removeItem();
    dispatch({ type: "LOGOUT" });
  };

  const updateProfile = (data: Partial<User>) => {
    dispatch({ type: "UPDATE_PROFILE", payload: data });
    if (state.user) {
      const updatedUser = { ...state.user, ...data };
      setItem(JSON.stringify(updatedUser));
      alert("Profile Updated!!!");
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
