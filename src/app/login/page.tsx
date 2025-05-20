'use client'; // Needed for useEffect and client-side navigation

import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation'; // App Router version
import { useEffect } from 'react';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnUrl = searchParams.get('returnUrl');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnUrl || '/dashboard');
    }
  }, [isAuthenticated, router, returnUrl]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </main>
  );
};

export default LoginPage;
