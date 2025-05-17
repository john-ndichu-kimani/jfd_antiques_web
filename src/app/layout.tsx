import type { Metadata } from 'next';
import '@/styles/global.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'JFD Collections African Antiques',
  description: 'Preserving African cultural heritage through authentic artifacts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}