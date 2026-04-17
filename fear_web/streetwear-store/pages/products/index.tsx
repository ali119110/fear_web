// pages/products/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { PRODUCTS, Product } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';

const FILTERS = ['All', 'Tops', 'Bottoms', 'Outerwear'];
const SORT_OPTIONS = ['Default', 'Price: Low to High', 'Price: High to Low'];

const ProductsPage: NextPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sort, setSort] = useState('Default');

  const filtered = PRODUCTS.filter(p =>
    activeFilter === 'All' ? true : p.productType === activeFilter
  );

  const sorted = [...filtered].sort((a, b) => {
    const pa = parseFloat(a.priceRange.minVariantPrice.amount);
    const pb = parseFloat(b.priceRange.minVariantPrice.amount);
    if (sort === 'Price: Low to High') return pa - pb;
    if (sort === 'Price: High to Low') return pb - pa;
    return 0;
  });

  return (
    <>
      <Head>
        <title>All Products — VOID Studio</title>
      </Head>

      {/* Page header */}
      <div className="pt-40 pb-16 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="font-mono text-xs tracking-ultra uppercase text-accent mb-4">— Archive</div>
        <h1 className="font-display text-6xl md:text-8xl text-bone font-light leading-none mb-2">
          All<br /><em className="italic text-ghost/40">Pieces</em>
        </h1>
        <div className="font-mono text-xs text-mist mt-6">{sorted.length} items</div>
      </div>

      {/* Filter + sort bar */}
      <div className="border-t border-b border-white/5 sticky top-16 bg-void/95 backdrop-blur-md z-30">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between gap-6">
          {/* Filters */}
          <div className="flex items-center gap-6 overflow-x-auto">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`font-mono text-xs tracking-ultra uppercase whitespace-nowrap transition-colors duration-200 pb-0.5 border-b ${
                  activeFilter === f
                    ? 'text-bone border-accent'
                    : 'text-mist border-transparent hover:text-bone hover:border-white/20'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-transparent font-mono text-xs tracking-wide uppercase text-mist hover:text-bone transition-colors outline-none cursor-pointer appearance-none border-none"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o} value={o} className="bg-ash text-bone">
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">
        {sorted.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
            {sorted.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="font-display text-4xl text-bone/20 font-light mb-4">Nothing here yet</div>
            <div className="font-mono text-xs text-mist uppercase tracking-ultra">Check back soon</div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
