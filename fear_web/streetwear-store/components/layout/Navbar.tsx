// components/layout/Navbar.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const count = totalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/collections/essentials', label: 'Essentials' },
    { href: '/collections/outerwear', label: 'Outerwear' },
    { href: '/collections/bottoms', label: 'Bottoms' },
    { href: '/products', label: 'All' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-void/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-2xl tracking-widest text-bone font-light">
            VOID
          </Link>

          {/* Center nav - desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs tracking-ultra uppercase text-ghost/70 hover:text-bone transition-colors duration-300 link-underline"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleCart}
              className="relative text-xs tracking-ultra uppercase text-ghost/70 hover:text-bone transition-colors duration-300"
            >
              <span className="font-body">Cart</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-4 w-4 h-4 rounded-full bg-accent text-void text-[10px] font-mono font-medium flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`block w-6 h-px bg-bone transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-4 h-px bg-bone transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-px bg-bone transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-void flex flex-col justify-center items-center transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-5xl text-bone tracking-wide hover:text-accent transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="absolute bottom-12 font-mono text-xs tracking-ultra uppercase text-mist">
          Free shipping on orders over $200
        </div>
      </div>
    </>
  );
}
