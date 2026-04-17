// pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { PRODUCTS, COLLECTIONS, formatPrice } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-screen flex flex-col overflow-hidden grid-bg">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&q=80"
          alt="VOID hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/40 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-void/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-24 px-6 md:px-16">
        <div className={`transition-all duration-1000 ease-expo ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="font-mono text-xs tracking-ultra uppercase text-accent mb-6">
            SS24 — New Arrivals
          </div>
          <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] text-bone font-light tracking-tight mb-10 max-w-4xl">
            Exist<br />
            <em className="italic text-ghost/60">Between</em><br />
            Definitions.
          </h1>
          <div className="flex items-center gap-8 flex-wrap">
            <Link
              href="/products"
              className="bg-bone text-void font-mono text-xs tracking-ultra uppercase px-10 py-4 hover:bg-accent transition-colors duration-300"
            >
              Shop Now
            </Link>
            <Link
              href="/collections/essentials"
              className="font-mono text-xs tracking-ultra uppercase text-bone/60 hover:text-bone transition-colors duration-300 link-underline"
            >
              View Essentials
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-10">
        <div className="font-mono text-[10px] tracking-ultra uppercase text-mist rotate-90 origin-center mb-4">Scroll</div>
        <div className="w-px h-16 bg-gradient-to-b from-mist/50 to-transparent" />
      </div>

      {/* Corner label */}
      <div className="absolute top-24 right-8 z-10">
        <div className="font-mono text-xs text-mist/50 tracking-wide text-right leading-loose">
          VOID Studio<br />
          Est. 2024<br />
          Los Angeles, CA
        </div>
      </div>
    </section>
  );
};

const MarqueeBar = () => (
  <div className="bg-accent overflow-hidden py-3.5">
    <div className="flex whitespace-nowrap animate-marquee">
      {Array(10).fill(null).map((_, i) => (
        <span key={i} className="font-mono text-xs tracking-ultra uppercase text-void mr-12">
          Free Shipping $200+ — Premium Heavyweight Fabrics — Limited Edition Drops — Garment Dyed —
        </span>
      ))}
    </div>
  </div>
);

const FeaturedProducts = () => (
  <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-28">
    <div className="flex items-end justify-between mb-16">
      <div>
        <div className="font-mono text-xs tracking-ultra uppercase text-accent mb-3">— Featured</div>
        <h2 className="font-display text-5xl md:text-7xl text-bone font-light leading-tight">
          New<br /><em className="italic text-ghost/50">Arrivals</em>
        </h2>
      </div>
      <Link
        href="/products"
        className="hidden md:block font-mono text-xs tracking-ultra uppercase text-mist hover:text-bone transition-colors duration-300 link-underline pb-1"
      >
        View All
      </Link>
    </div>

    {/* Product grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {PRODUCTS.slice(0, 4).map((product, i) => (
        <div key={product.id} className={`animate-fade-up opacity-0 ${i < 2 ? 'mt-0' : 'mt-8 md:mt-16'}`} style={{ animationFillMode: 'forwards' }}>
          <ProductCard product={product} index={i} />
        </div>
      ))}
    </div>
  </section>
);

const BrandStatement = () => (
  <section className="relative py-40 overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
    <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 text-center">
      <div className="font-mono text-xs tracking-ultra uppercase text-accent mb-12">— The Philosophy</div>
      <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] text-bone font-light leading-[1.05] max-w-5xl mx-auto">
        Not for everyone.<br />
        <em className="italic text-ghost/40">Built for those</em><br />
        who understand silence.
      </h2>
      <div className="mt-16 h-px w-24 bg-accent mx-auto" />
      <p className="mt-12 font-body text-sm text-mist leading-loose max-w-md mx-auto">
        Every piece is constructed with intention. Heavyweight fabrics, minimal branding, considered silhouettes. 
        We make clothes for people who don&apos;t need to explain their choices.
      </p>
    </div>
  </section>
);

const CollectionHighlights = () => (
  <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-20">
    <div className="font-mono text-xs tracking-ultra uppercase text-accent mb-16 text-center">— Collections</div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {COLLECTIONS.map((col, i) => (
        <Link
          key={col.id}
          href={`/collections/${col.handle}`}
          className="group relative overflow-hidden img-hover-zoom"
          style={{ aspectRatio: i === 1 ? '3/4' : '4/5' }}
        >
          <Image
            src={col.image.url}
            alt={col.image.altText}
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="font-display text-3xl text-bone font-light tracking-wide">{col.title}</div>
            <div className="font-mono text-xs text-accent mt-2 tracking-wide uppercase group-hover:text-bone transition-colors duration-300">
              {col.products.length} Pieces →
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

const RestOfProducts = () => (
  <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-20">
    <div className="flex items-end justify-between mb-12">
      <h2 className="font-display text-4xl text-bone font-light">More Pieces</h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {PRODUCTS.slice(4).map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  </section>
);

const EmailCapture = () => (
  <section className="border-t border-b border-white/5 py-24">
    <div className="max-w-screen-xl mx-auto px-6 md:px-10">
      <div className="max-w-lg mx-auto text-center">
        <div className="font-mono text-xs tracking-ultra uppercase text-accent mb-6">— Stay in the Loop</div>
        <h2 className="font-display text-4xl text-bone font-light mb-3">
          First to know.<br />
          <em className="italic text-ghost/50">First to drop.</em>
        </h2>
        <p className="font-body text-sm text-mist mb-10">
          Join the inner circle. New drops, restocks, and exclusive access — nothing else.
        </p>
        <div className="flex gap-0">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-zinc border border-white/10 text-bone font-body text-sm px-5 py-3.5 outline-none focus:border-accent/50 transition-colors placeholder:text-mist/40"
          />
          <button className="bg-accent text-void font-mono text-xs tracking-ultra uppercase px-8 py-3.5 hover:bg-bone transition-colors duration-300 flex-shrink-0">
            Join
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>VOID Studio — Premium Streetwear</title>
      </Head>
      <HeroSection />
      <MarqueeBar />
      <FeaturedProducts />
      <BrandStatement />
      <CollectionHighlights />
      <RestOfProducts />
      <EmailCapture />
    </>
  );
};

export default Home;
