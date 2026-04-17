// pages/cart.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/products';

const CartPage: NextPage = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const subtotal = totalPrice();
  const shipping = subtotal >= 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <>
      <Head>
        <title>Cart — VOID Studio</title>
      </Head>

      <div className="pt-32 pb-28 max-w-screen-xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <div className="font-mono text-xs tracking-ultra uppercase text-accent mb-4">— Your Selection</div>
          <h1 className="font-display text-6xl md:text-8xl text-bone font-light leading-none">
            Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="py-32 text-center">
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-8">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-mist">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <div className="font-display text-4xl text-bone/30 font-light mb-4">Empty vessel</div>
            <p className="font-body text-sm text-mist mb-10">Your cart is empty. Begin your selection.</p>
            <Link
              href="/products"
              className="inline-block bg-bone text-void font-mono text-xs tracking-ultra uppercase px-12 py-4 hover:bg-accent transition-colors duration-300"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">
            {/* Items */}
            <div>
              {/* Column headers */}
              <div className="hidden md:grid grid-cols-[1fr_120px_120px_40px] gap-4 mb-6 pb-4 border-b border-white/5">
                {['Product', 'Size', 'Quantity', ''].map(h => (
                  <div key={h} className="font-mono text-xs tracking-ultra uppercase text-mist">{h}</div>
                ))}
              </div>

              {/* Cart rows */}
              <div className="flex flex-col divide-y divide-white/5">
                {items.map(item => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px_40px] gap-4 py-8 items-center">
                    {/* Product info */}
                    <div className="flex gap-5">
                      <div className="relative w-20 h-24 bg-zinc flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.product.images[0]?.url || ''}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <Link
                          href={`/products/${item.product.handle}`}
                          className="font-body text-sm text-bone hover:text-accent transition-colors font-medium mb-1"
                        >
                          {item.product.title}
                        </Link>
                        <div className="font-mono text-xs text-mist mb-3 uppercase tracking-wide">
                          {item.product.productType}
                        </div>
                        <div className="font-body text-sm text-ghost">
                          {formatPrice((parseFloat(item.variant.price) * item.quantity).toFixed(2))}
                        </div>
                      </div>
                    </div>

                    {/* Size */}
                    <div className="font-mono text-xs text-mist uppercase tracking-wide">
                      {item.variant.selectedOptions.map(o => o.value).join(' / ')}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center border border-white/10 w-fit">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-mist hover:text-bone transition-colors text-lg"
                      >−</button>
                      <span className="w-9 text-center font-mono text-xs text-bone">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-mist hover:text-bone transition-colors text-lg"
                      >+</button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-mist/40 hover:text-bone transition-colors duration-200 w-fit"
                      aria-label="Remove"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="mt-8 font-mono text-xs tracking-ultra uppercase text-mist/40 hover:text-mist transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-ash border border-white/5 p-8 sticky top-24">
                <div className="font-mono text-xs tracking-ultra uppercase text-accent mb-8">— Order Summary</div>

                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-mist">Subtotal</span>
                    <span className="font-body text-sm text-bone">{formatPrice(subtotal.toFixed(2))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-mist">Shipping</span>
                    <span className="font-body text-sm text-bone">
                      {shipping === 0 ? 'Free' : formatPrice(shipping.toFixed(2))}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <div className="font-mono text-xs text-accent/70">
                      Add {formatPrice((200 - subtotal).toFixed(2))} more for free shipping
                    </div>
                  )}
                </div>

                <div className="h-px bg-white/5 mb-6" />

                <div className="flex justify-between mb-8">
                  <span className="font-body text-base text-bone font-medium">Total</span>
                  <span className="font-body text-xl text-bone">{formatPrice(total.toFixed(2))}</span>
                </div>

                {/* Promo code */}
                <div className="flex gap-0 mb-6">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 bg-zinc border border-white/10 text-bone font-mono text-xs px-4 py-3 outline-none focus:border-accent/50 transition-colors placeholder:text-mist/30"
                  />
                  <button className="bg-zinc border border-l-0 border-white/10 text-mist font-mono text-xs tracking-wide uppercase px-5 hover:text-bone transition-colors">
                    Apply
                  </button>
                </div>

                <button className="w-full bg-bone text-void font-mono text-xs tracking-ultra uppercase py-4 hover:bg-accent transition-colors duration-300 mb-3">
                  Proceed to Checkout
                </button>
                <Link
                  href="/products"
                  className="block w-full text-center font-mono text-xs tracking-ultra uppercase text-mist hover:text-bone transition-colors duration-300 py-2"
                >
                  Continue Shopping
                </Link>

                {/* Trust badges */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
                  {[
                    { icon: '🔒', text: 'Secure checkout' },
                    { icon: '↩', text: '30-day returns' },
                    { icon: '✦', text: 'Free shipping over $200' },
                  ].map(badge => (
                    <div key={badge.text} className="flex items-center gap-3">
                      <span className="text-sm">{badge.icon}</span>
                      <span className="font-mono text-xs text-mist/60 tracking-wide">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
