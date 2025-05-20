"use client"
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import type { NextPage } from 'next';
import Head from 'next/head';


const DashboardPage: NextPage = () => {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <Head>
        <title>Dashboard | Your App</title>
        <meta name="description" content="User dashboard" />
      </Head>
      
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            
            <div className="flex items-center">
              <span className="mr-4">Welcome, {user?.firstName || user?.email}</span>
              <button
                onClick={() => logout()}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
              <h2 className="text-2xl font-semibold mb-4">Your Dashboard Content</h2>
              <p>Welcome to your secure dashboard!</p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;