// src/components/auth/ResetPasswordForm.tsx
"use client"
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthForm, validateResetPassword } from '../../hooks/useAuthForm';

const ResetPasswordForm: React.FC = () => {
  const { resetPassword } = useAuth();
  const router = useRouter();
  const { token } = router.query;
  
  const { 
    values, 
    errors, 
    isSubmitting, 
    submitError, 
    handleChange, 
    handleSubmit 
  } = useAuthForm({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      if (typeof token !== 'string') {
        throw new Error('Reset token is missing or invalid');
      }
      
      await resetPassword({
        token,
        newPassword: values.newPassword,
      });
    },
    validate: validateResetPassword,
  });

  if (!token) {
    return (
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center text-red-600">Invalid Password Reset Link</h2>
        <p className="mb-6 text-center">
          The password reset link is invalid or has expired. Please request a new one.
        </p>
        <div className="text-center">
          <Link
            href="/forgot-password"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
      
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={values.newPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.newPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Password must be at least 8 characters long
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>
        
        <div className="mb-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;