// src/pages/forgot-password.tsx
import ForgotPasswordForm from '@/components/auth/ForgotPasswodForm';
import type { NextPage } from 'next';
import Head from 'next/head';

const ForgotPasswordPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Forgot Password | Your App</title>
        <meta name="description" content="Reset your password" />
      </Head>
      
      <main className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <ForgotPasswordForm />
      </main>
    </>
  );
};

export default ForgotPasswordPage;