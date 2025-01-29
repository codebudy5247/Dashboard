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

/**
 * Reducer function to manage authentication state.
 * The reducer handles the following action types:
 * - "LOGIN_SUCCESS": Updates the state to reflect a successful login, setting `isAuthenticated` to true, updating the `user` with the payload, clearing any errors, and setting `loading` to false.
 * - "LOGIN_ERROR": Updates the state to reflect a login error, setting the `error` with the payload and `loading` to false.
 * - "LOGOUT": Resets the state to the initial state, setting `loading` to false.
 * - "UPDATE_PROFILE": Updates the user's profile information with the payload.
 *
 * If the action type is not recognized, the current state is returned unchanged.
 */
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

  /**
   * Authenticates a user with the provided email and password.
   * If the credentials match the mock user, it stores the user information
   * and dispatches a login success action. Otherwise, it throws an error
   * and dispatches a login error action.
   */
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

  /**
   * Logs the user out by removing the authentication item and dispatching a logout action.
   *
   * This function performs the following actions:
   * 1. Calls `removeItem()` to remove the authentication item.
   * 2. Dispatches a "LOGOUT" action to update the authentication state in the context.
   */
  const logout = () => {
    removeItem();
    dispatch({ type: "LOGOUT" });
  };

  /**
   * Updates the user profile with the provided data.
   * Dispatches an action to update the profile in the state.
   * If a user exists in the state, merges the existing user data with the new data,
   * updates the local storage, and shows an alert indicating the profile update.
   */
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

/**
 * Custom hook to access the authentication context.
 *
 * This hook provides access to the authentication context, allowing components
 * to consume authentication-related data and functions.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
