import { createContext, useState, ReactNode } from 'react';
import { login, signup, logout } from '../api/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  access_token: null,
  refresh_token: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [access_token, setAccessToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [refresh_token, setRefreshToken] = useState<string | null>(localStorage.getItem('refresh_token'));

  const handleLogin = async (email: string, password: string) => {
    try {
      const { user, access_token, refresh_token } = await login(email, password);
      setUser(user);
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const { user } = await signup(email, password);
      setUser(user);
    } catch (error) {
      throw new Error('Signup failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, access_token, refresh_token, login: handleLogin, signup: handleSignup, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
