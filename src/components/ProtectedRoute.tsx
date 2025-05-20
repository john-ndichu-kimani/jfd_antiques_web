// src/components/ProtectedRoute.tsx
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';


interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // Optional role-based access control
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If authentication check is complete (not loading) and user is not authenticated
    // if (!isLoading && !isAuthenticated) {
    //   // Redirect to login page with return URL
    //   router.push({
    //     pathname: '/login',
    //     query: { returnUrl: router.asPath },
    //   });
    // }

    // If role is required but user doesn't have it
    if (!isLoading && isAuthenticated && requiredRole && user?.role !== requiredRole) {
      // Redirect to unauthorized page or dashboard
      router.push('/unauthorized');
    }
  }, [isLoading, isAuthenticated, router, requiredRole, user?.role]);

  // Show nothing while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If not authenticated or doesn't have required role, don't render children
  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return null;
  }

  // Otherwise, render children
  return <>{children}</>;
};

export default ProtectedRoute;