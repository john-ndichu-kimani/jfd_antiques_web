import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';;
import authService, { 
  AuthResponse, 
  RegisterRequest, 
  LoginRequest, 
  UpdatePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../lib/services/auth_services';

interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  register: (userData: RegisterRequest) => Promise<void>;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  updatePassword: (passwordData: UpdatePasswordRequest) => Promise<void>;
  forgotPassword: (data: ForgotPasswordRequest) => Promise<{ success: boolean; resetToken?: string }>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
  clearError: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  updatePassword: async () => {},
  forgotPassword: async () => ({ success: false }),
  resetPassword: async () => {},
  clearError: () => {},
});

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (authService.isLoggedIn()) {
          setIsLoading(true);
          const response = await authService.getCurrentUser();
          if (response.data?.user) {
            setUser(response.data.user);
          }
        }
      } catch (err) {
        console.error('Failed to load user:', err);
        // Clear any tokens if user load fails
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const register = async (userData: RegisterRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      if (response.data?.user) {
        setUser(response.data.user);
        router.push('/dashboard'); // Redirect after successful registration
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      if (response.data?.user) {
        setUser(response.data.user);
        router.push('/dashboard'); // Redirect after successful login
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      // Clear user state
      setUser(null);
      router.push('/login'); // Redirect to login page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (passwordData: UpdatePasswordRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.updatePassword(passwordData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password update failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (data: ForgotPasswordRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.forgotPassword(data);
      return {
        success: response.success,
        resetToken: response.resetToken,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset request failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.resetPassword(data);
      router.push('/login'); // Redirect to login after password reset
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updatePassword,
    forgotPassword,
    resetPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};