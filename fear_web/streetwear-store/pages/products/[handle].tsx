// pages/products/[handle].tsx
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS, Product, ProductVariant, formatPrice, getProductByHandle } from '@/lib/products';
import { useCart } from '@/lib/cart';
import ProductCard from '@/components/product/ProductCard';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

const ProductPage: NextPage<Props> = ({ product, relatedProducts }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedMsg, setAddedMsg] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const { addItem } = useCart();

  const sizes = product.options.find(o => o.name === 'Size')?.values || [];
  const activeVariant = product.variants.find(v =>
    v.selectedOptions.some(o => o.name === 'Size' && o.value === selectedSize)
  ) ?? product.variants[0];

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem(product, activeVariant);
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2000);
  };

  return (
    <>
      <Head>
        <title>{product.title} — VOID Studio</title>
      </Head>

      {/* Breadcrumb */}
      <div className="pt-28 pb-6 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs text-mist tracking-wide">
          <Link href="/" className="hover:text-bone transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-bone transition-colors">Products</Link>
          <span>/</span>
          <span className="text-bone">{product.title}</span>
        </div>
      </div>

      {/* Main product area */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Image gallery */}
          <div className="flex flex-col gap-3">
            {/* Main image */}
            <div className="relative w-full bg-zinc overflow-hidden" style={{ aspectRatio: '4/5' }}>
              {product.images.map((img, i) => (
                <Image
                  key={i}
                  src={img.url}
                  alt={img.altText}
                  fill
                  priority={i === 0}
                  className={`object-cover transition-opacity duration-500 ${i === activeImage ? 'opacity-100' : 'opacity-0'}`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ))}

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 font-mono text-xs text-bone/60 bg-void/60 px-2 py-1 backdrop-blur-sm">
                {activeImage + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-shrink-0 w-20 h-24 bg-zinc overflow-hidden border transition-colors duration-200 ${
                      i === activeImage ? 'border-accent' : 'border-transparent hover:border-white/20'
                    }`}
                  >
                    <Image src={img.url} alt={img.altText} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col lg:pt-4">
            {/* Type badge */}
            <div className="font-mono text-xs tracking-ultra uppercase text-accent mb-4">
              {product.productType}
            </div>

            {/* Title & price */}
            <h1 className="font-display text-5xl text-bone font-light leading-tight mb-3">
              {product.title}
            </h1>
            <div className="font-body text-2xl text-bone mb-8">
              {formatPrice(product.priceRange.minVariantPrice.amount)}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mb-8" />

            {/* Size selection */}
            {sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-mono text-xs tracking-ultra uppercase transition-colors duration-200 ${sizeError ? 'text-red-400' : 'text-mist'}`}>
                    {sizeError ? '— Please select a size' : '— Select Size'}
                  </span>
                  <span className="font-mono text-xs text-mist/50 hover:text-bone transition-colors cursor-pointer link-underline">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => {
                    const variant = product.variants.find(v =>
                      v.selectedOptions.some(o => o.name === 'Size' && o.value === size)
                    );
                    const available = variant?.availableForSale ?? false;
                    return (
                      <button
                        key={size}
                        onClick={() => available && setSelectedSize(size)}
                        disabled={!available}
                        className={`
                          w-14 h-12 font-mono text-xs tracking-wide uppercase border transition-all duration-200
                          ${!available ? 'border-white/5 text-mist/20 cursor-not-allowed line-through' :
                            selectedSize === size
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-white/15 text-mist hover:border-white/40 hover:text-bone'
                          }
                        `}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={`
                w-full py-4 font-mono text-xs tracking-ultra uppercase transition-all duration-300 mb-4
                ${addedMsg
                  ? 'bg-accent text-void'
                  : 'bg-bone text-void hover:bg-accent'
                }
              `}
            >
              {addedMsg ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            {/* Wishlist */}
            <button className="w-full py-4 font-mono text-xs tracking-ultra uppercase border border-white/10 text-mist hover:text-bone hover:border-white/30 transition-all duration-300 mb-10">
              Save to Wishlist
            </button>

            {/* Divider */}
            <div className="h-px bg-white/5 mb-8" />

            {/* Description */}
            <div className="mb-8">
              <div className="font-mono text-xs tracking-ultra uppercase text-mist mb-4">— Description</div>
              <p className="font-body text-sm text-ghost/70 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Details accordion */}
            {[
              {
                title: 'Material & Care',
                content: 'Composition varies per style — see garment label. Machine wash cold. Tumble dry low. Do not bleach. Iron on low heat if needed.',
              },
              {
                title: 'Shipping & Returns',
                content: 'Free standard shipping on orders over $200. Express available at checkout. Returns accepted within 30 days of delivery — unworn, unwashed, with original tags.',
              },
            ].map(item => (
              <AccordionItem key={item.title} {...item} />
            ))}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span key={tag} className="font-mono text-[10px] tracking-wide uppercase border border-white/10 text-mist px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-white/5 pt-20 pb-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10">
            <div className="font-mono text-xs tracking-ultra uppercase text-accent mb-4">— You May Also Like</div>
            <h2 className="font-display text-4xl text-bone font-light mb-12">Related Pieces</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-mono text-xs tracking-ultra uppercase text-mist hover:text-bone transition-colors">{title}</span>
        <span className={`text-mist transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-4' : 'max-h-0'}`}>
        <p className="font-body text-sm text-ghost/60 leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: PRODUCTS.map(p => ({ params: { handle: p.handle } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const product = getProductByHandle(params?.handle as string);
  if (!product) return { notFound: true };

  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && (p.productType === product.productType || p.tags.some(t => product.tags.includes(t)))
  ).slice(0, 4);

  return { props: { product, relatedProducts } };
};

export default ProductPage;
