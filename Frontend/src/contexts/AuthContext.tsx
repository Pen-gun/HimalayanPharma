import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { api, setAccessToken, getAccessToken, clearAccessToken } from '../lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Handle logout event from api.ts when refresh token fails
  const handleForceLogout = useCallback(() => {
    setUser(null);
    clearAccessToken();
  }, []);

  useEffect(() => {
    // Listen for forced logout events (when refresh token expires)
    window.addEventListener('auth:logout', handleForceLogout);
    return () => {
      window.removeEventListener('auth:logout', handleForceLogout);
    };
  }, [handleForceLogout]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Try to refresh the token first (uses httpOnly cookie)
        const refreshResponse = await api.auth.refresh();
        if (refreshResponse.data?.accessToken) {
          setAccessToken(refreshResponse.data.accessToken, refreshResponse.data.expiresIn);
        }
        
        // If refresh succeeded, get user data
        if (getAccessToken()) {
          const userResponse = await api.auth.getMe();
          setUser(userResponse.data.user);
        }
      } catch {
        // No valid session - user needs to login
        clearAccessToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.auth.login({ email, password });
    setUser(response.data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await api.auth.register({ name, email, password });
    setUser(response.data.user);
  };

  const logout = async () => {
    await api.auth.logout();
    setUser(null);
  };

  const logoutAll = async () => {
    await api.auth.logoutAll();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        logoutAll,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
