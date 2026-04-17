// components/product/ProductCard.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, formatPrice } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: 'default' | 'large' | 'featured';
}

export default function ProductCard({ product, index = 0, variant = 'default' }: ProductCardProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const price = formatPrice(product.priceRange.minVariantPrice.amount);
  const hasMultipleImages = product.images.length > 1;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image container */}
      <div
        className="relative bg-zinc overflow-hidden img-hover-zoom"
        style={{ aspectRatio: variant === 'large' ? '3/4' : '4/5' }}
        onMouseEnter={() => hasMultipleImages && setImgIdx(1)}
        onMouseLeave={() => setImgIdx(0)}
      >
        {product.images[0] && (
          <Image
            src={product.images[0].url}
            alt={product.images[0].altText}
            fill
            className={`object-cover transition-opacity duration-500 ${imgIdx === 1 ? 'opacity-0' : 'opacity-100'}`}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
        {product.images[1] && (
          <Image
            src={product.images[1].url}
            alt={product.images[1].altText}
            fill
            className={`object-cover transition-opacity duration-500 ${imgIdx === 1 ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.tags.includes('new') && (
            <span className="bg-accent text-void font-mono text-[10px] tracking-wide uppercase px-2 py-0.5">
              New
            </span>
          )}
        </div>

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-void/90 py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-expo">
          <div className="font-mono text-xs tracking-ultra uppercase text-bone text-center">
            Quick View
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-body text-sm text-bone font-medium leading-tight group-hover:text-accent transition-colors duration-300">
              {product.title}
            </div>
            <div className="font-mono text-xs text-mist mt-0.5 tracking-wide uppercase">
              {product.productType}
            </div>
          </div>
          <div className="font-body text-sm text-ghost flex-shrink-0">{price}</div>
        </div>
      </div>
    </Link>
  );
}
