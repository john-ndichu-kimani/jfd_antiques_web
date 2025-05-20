// src/components/auth/LoginForm.tsx
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthForm, validateLogin } from '../../hooks/useAuthForm';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  
  const { 
    values, 
    errors, 
    isSubmitting, 
    submitError, 
    handleChange, 
    handleSubmit 
  } = useAuthForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      await login(values);
    },
    validate: validateLogin,
  });

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
      
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        
        <div className="mb-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-4 text-sm">
          <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800">
            Forgot Password?
          </Link>
          <Link href="/register" className="text-blue-600 hover:text-blue-800">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;