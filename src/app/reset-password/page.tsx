import ResetPasswordForm from '@/components/auth/ResetPassword';
import type { NextPage } from 'next';
import Head from 'next/head';

const ResetPasswordPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Reset Password | Your App</title>
        <meta name="description" content="Set a new password" />
      </Head>
      
      <main className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <ResetPasswordForm />
      </main>
    </>
  );
};