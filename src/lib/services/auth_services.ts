// src/services/AuthService.ts
import axios from 'axios';
// import { AxiosError } from 'axios';




// API base URL - adjust as needed for your environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Define types for request and response data
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  data?: {
    user: {
      id: string;
      email: string;
      role: string;
      firstName?: string;
      lastName?: string;
    };
  };
  message?: string;
  resetToken?: string;
}

export interface ApiError {
  success: boolean;
  message: string;
  errors?: Array<{ msg: string; param: string }>;
}

// Configure axios
const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true, // Required for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle errors consistently
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

// Request interceptor to add JWT token
authApi.interceptors.request.use(
  (config) => {
    // Get token from local storage when needed (for non-cookie implementations)
    const token = localStorage.getItem('token');
    if (token) {
      // config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AuthService class with all API methods
class AuthService {
  /**
   * Register a new user
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await authApi.post<AuthResponse>('/register', userData);
      
      // Store token in localStorage (optional, as we're also using HTTP-only cookies)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Login a user
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await authApi.post<AuthResponse>('/login', credentials);
      
      // Store token in localStorage (optional, as we're also using HTTP-only cookies)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get the current user's profile
   */
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const response = await authApi.get<AuthResponse>('/me');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Logout the current user
   */
  async logout(): Promise<AuthResponse> {
    try {
      const response = await authApi.post<AuthResponse>('/logout');
      
      // Clear local storage
      localStorage.removeItem('token');
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update the current user's password
   */
  async updatePassword(passwordData: UpdatePasswordRequest): Promise<AuthResponse> {
    try {
      const response = await authApi.put<AuthResponse>('/update-password', passwordData);
      
      // Update token if a new one is returned
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Request a password reset
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<AuthResponse> {
    try {
      const response = await authApi.post<AuthResponse>('/forgot-password', data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordRequest): Promise<AuthResponse> {
    try {
      const response = await authApi.post<AuthResponse>('/reset-password', data);
      
      // Update token if a new one is returned
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Check if the user is logged in
   */
  isLoggedIn(): boolean {
    // Check both localStorage token and/or cookies
    // For cookie-based auth, this might need adjustment
    return !!localStorage.getItem('token');
  }

  /**
   * Handle errors from API calls
   */
  private handleError(error: unknown): Error {
    if (error) {
      const axiosError = error;
      const errorMessage = 
        
        'An error occurred';
      return new Error(errorMessage);
    }
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
}

// Create singleton instance
const authService = new AuthService();
export default authService;