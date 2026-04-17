// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import Cursor from '@/components/ui/Cursor';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Prevent FOUC
    document.documentElement.style.visibility = 'visible';
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />
      <CartDrawer />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
