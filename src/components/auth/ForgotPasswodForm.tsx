// src/components/auth/ForgotPasswordForm.tsx
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthForm, validateForgotPassword } from '../../hooks/useAuthForm';

const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword } = useAuth();
  const [requestSent, setRequestSent] = useState(false);
  const [resetToken, setResetToken] = useState<string | undefined>(undefined);
  
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
    },
    onSubmit: async (values) => {
      const result = await forgotPassword(values);
      if (result.success) {
        setRequestSent(true);
        // In a real application, you wouldn't show this token to the user
        // It would be sent via email. This is just for demonstration purposes.
        if (result.resetToken) {
          setResetToken(result.resetToken);
        }
      }
    },
    validate: validateForgotPassword,
  });

  if (requestSent) {
    return (
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Check Your Email</h2>
        <p className="mb-4 text-center">
          If an account exists for {values.email}, we have sent password reset instructions.
        </p>
        
        {/* This section would only be visible in development for testing */}
        {resetToken && process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-2">Development Only: Reset Token</p>
            <p className="text-xs break-all bg-gray-200 p-2 rounded">{resetToken}</p>
            <div className="mt-4">
              <Link 
                href={`/reset-password?token=${resetToken}`}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Go to reset password page
              </Link>
            </div>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
      
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
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
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div className="mb-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Reset Password'}
          </button>
        </div>
        
        <div className="text-center mt-4">
          <Link href="/login" className="text-blue-600 hover:text-blue-800 text-sm">
            Remember your password? Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;