'use client';

import '@/styles/global.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/contexts/AuthContext';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 font-sans">
       <AuthProvider>
        <Header />
        {children}
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}