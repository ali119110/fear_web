// pages/collections/[handle].tsx
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { COLLECTIONS, Collection, getCollectionByHandle } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';

interface Props {
  collection: Collection;
  otherCollections: Collection[];
}

const CollectionPage: NextPage<Props> = ({ collection, otherCollections }) => {
  return (
    <>
      <Head>
        <title>{collection.title} — VOID Studio</title>
      </Head>

      {/* Collection hero */}
      <div className="relative h-[55vh] min-h-[400px] flex flex-col justify-end overflow-hidden">
        <Image
          src={collection.image.url}
          alt={collection.image.altText}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 w-full pb-14">
          <div className="font-mono text-xs tracking-ultra uppercase text-accent mb-4">— Collection</div>
          <h1 className="font-display text-6xl md:text-8xl text-bone font-light leading-none">
            {collection.title}
          </h1>
          <p className="font-body text-sm text-mist mt-4 max-w-sm">{collection.description}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-white/5">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono text-xs text-mist tracking-wide">
            <Link href="/" className="hover:text-bone transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-bone transition-colors">Products</Link>
            <span>/</span>
            <span className="text-bone">{collection.title}</span>
          </div>
          <div className="font-mono text-xs text-mist">{collection.products.length} items</div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-20">
        {collection.products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
            {collection.products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="font-display text-4xl text-bone/20 font-light mb-4">Coming Soon</div>
            <div className="font-mono text-xs text-mist uppercase tracking-ultra">New pieces dropping shortly</div>
          </div>
        )}
      </div>

      {/* Other collections */}
      {otherCollections.length > 0 && (
        <section className="border-t border-white/5 py-20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10">
            <div className="font-mono text-xs tracking-ultra uppercase text-accent mb-4">— Explore More</div>
            <h2 className="font-display text-4xl text-bone font-light mb-12">Other Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherCollections.map(col => (
                <Link
                  key={col.id}
                  href={`/collections/${col.handle}`}
                  className="group relative overflow-hidden img-hover-zoom"
                  style={{ aspectRatio: '16/7' }}
                >
                  <Image src={col.image.url} alt={col.image.altText} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-void/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-center pl-12">
                    <div className="font-display text-4xl text-bone font-light group-hover:text-accent transition-colors duration-300">
                      {col.title}
                    </div>
                    <div className="font-mono text-xs text-accent mt-2 tracking-ultra uppercase">
                      {col.products.length} Pieces →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: COLLECTIONS.map(c => ({ params: { handle: c.handle } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const collection = getCollectionByHandle(params?.handle as string);
  if (!collection) return { notFound: true };
  const otherCollections = COLLECTIONS.filter(c => c.id !== collection.id);
  return { props: { collection, otherCollections } };
};

export default CollectionPage;
