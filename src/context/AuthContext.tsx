import { createContext, useState, ReactNode } from 'react';
import { login, signup, logout } from '../api/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLogin = async (email: string, password: string) => {
    try {
      const { user, token } = await login(email, password);
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const { user, token } = await signup(email, password);
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      throw new Error('Signup failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login: handleLogin, signup: handleSignup, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
