// src/pages/profile/security.tsx (Example of account security page with password update)
import type { NextPage } from 'next';
import Head from 'next/head';
import ProtectedRoute from '../../components/ProtectedRoute';


const SecurityPage: NextPage = () => {
  return (
    <ProtectedRoute>
      <Head>
        <title>Account Security | Your App</title>
        <meta name="description" content="Manage your account security" />
      </Head>
      
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Account Security</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Password Management</h2>
              {/* <UpdatePasswordForm /> */}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default SecurityPage;