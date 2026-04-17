// components/cart/CartDrawer.tsx
'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/products';

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const total = totalPrice();
  const count = totalItems();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-void/80 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-ash border-l border-white/5 z-[70] flex flex-col transition-transform duration-500 ease-expo ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
          <div>
            <div className="font-display text-xl text-bone">Your Cart</div>
            <div className="font-mono text-xs text-mist mt-0.5">{count} {count === 1 ? 'item' : 'items'}</div>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center text-mist hover:text-bone transition-colors"
            aria-label="Close cart"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-6 px-8 text-center">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-mist">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <div>
                <div className="font-display text-xl text-bone mb-2">Empty vessel</div>
                <div className="font-body text-sm text-mist">Your cart awaits the right pieces.</div>
              </div>
              <Link
                href="/products"
                onClick={closeCart}
                className="font-mono text-xs tracking-ultra uppercase text-bone border border-white/20 px-8 py-3 hover:bg-white/5 transition-colors duration-300"
              >
                Explore
              </Link>
            </div>
          ) : (
            <div className="px-8 py-6 flex flex-col gap-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-24 bg-zinc flex-shrink-0 overflow-hidden relative">
                    <Image
                      src={item.product.images[0]?.url || ''}
                      alt={item.product.images[0]?.altText || item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-body text-sm text-bone font-medium leading-tight mb-1">{item.product.title}</div>
                    <div className="font-mono text-xs text-mist mb-3">
                      {item.variant.selectedOptions.map(o => o.value).join(' / ')}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-mist hover:text-bone transition-colors text-lg leading-none"
                        >-</button>
                        <span className="w-8 text-center font-mono text-xs text-bone">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-mist hover:text-bone transition-colors text-lg leading-none"
                        >+</button>
                      </div>
                      <div className="font-body text-sm text-bone">
                        {formatPrice((parseFloat(item.variant.price) * item.quantity).toFixed(2))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start text-mist/50 hover:text-bone transition-colors mt-1"
                    aria-label="Remove item"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-6 border-t border-white/5">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-xs uppercase tracking-ultra text-mist">Subtotal</span>
              <span className="font-body text-lg text-bone">{formatPrice(total.toFixed(2))}</span>
            </div>
            <div className="font-mono text-xs text-mist/50 mb-6">Shipping calculated at checkout</div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full bg-bone text-void text-center font-mono text-xs tracking-ultra uppercase py-4 hover:bg-accent transition-colors duration-300 mb-3"
            >
              Checkout
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center font-mono text-xs tracking-ultra uppercase text-mist hover:text-bone transition-colors duration-300 py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
