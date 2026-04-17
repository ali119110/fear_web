// lib/products.ts
// Mock product data — structured for Shopify Storefront API compatibility
// Replace with Shopify API calls when ready

export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  currencyCode: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  productType: string;
  tags: string[];
  images: { url: string; altText: string }[];
  variants: ProductVariant[];
  options: { name: string; values: string[] }[];
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: { url: string; altText: string };
  products: Product[];
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const makeVariants = (sizes: string[], price: string): ProductVariant[] =>
  sizes.map((s, i) => ({
    id: `variant-${i}`,
    title: s,
    price,
    currencyCode: 'USD',
    availableForSale: s !== 'XS',
    selectedOptions: [{ name: 'Size', value: s }],
  }));

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    handle: 'void-oversized-tee',
    title: 'VOID Oversized Tee',
    description: 'Heavyweight 320gsm cotton. Dropped shoulders, boxy silhouette. Garment-dyed in small batches for unique tonal variation. A foundational piece built to outlast trends.',
    vendor: 'VOID',
    productType: 'Tops',
    tags: ['oversized', 'tee', 'essentials', 'heavyweight'],
    images: [
      { url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80', altText: 'VOID Oversized Tee Front' },
      { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', altText: 'VOID Oversized Tee Back' },
    ],
    variants: makeVariants(SIZES, '98.00'),
    options: [{ name: 'Size', values: SIZES }],
    priceRange: {
      minVariantPrice: { amount: '98.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '98.00', currencyCode: 'USD' },
    },
  },
  {
    id: 'prod-002',
    handle: 'fragment-cargo-pant',
    title: 'Fragment Cargo Pant',
    description: 'Wide-leg cargo silhouette in technical ripstop. Six-pocket construction with hidden zip closures. Elasticated waist with drawstring. Built for movement, styled for stillness.',
    vendor: 'VOID',
    productType: 'Bottoms',
    tags: ['cargo', 'pants', 'wide-leg', 'technical'],
    images: [
      { url: 'https://images.unsplash.com/photo-1624378441864-6f7e4a60b8b5?w=800&q=80', altText: 'Fragment Cargo Pant' },
      { url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', altText: 'Fragment Cargo Pant Detail' },
    ],
    variants: makeVariants(['28', '30', '32', '34', '36'], '198.00'),
    options: [{ name: 'Size', values: ['28', '30', '32', '34', '36'] }],
    priceRange: {
      minVariantPrice: { amount: '198.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '198.00', currencyCode: 'USD' },
    },
  },
  {
    id: 'prod-003',
    handle: 'monolith-hoodie',
    title: 'Monolith Hoodie',
    description: 'French terry 400gsm. Double-lined hood, kangaroo pocket with internal zip. Raw hem detailing. A silhouette that commands presence without speaking.',
    vendor: 'VOID',
    productType: 'Tops',
    tags: ['hoodie', 'heavyweight', 'essentials'],
    images: [
      { url: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80', altText: 'Monolith Hoodie' },
      { url: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80', altText: 'Monolith Hoodie Detail' },
    ],
    variants: makeVariants(SIZES, '168.00'),
    options: [{ name: 'Size', values: SIZES }],
    priceRange: {
      minVariantPrice: { amount: '168.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '168.00', currencyCode: 'USD' },
    },
  },
  {
    id: 'prod-004',
    handle: 'axis-bomber-jacket',
    title: 'Axis Bomber Jacket',
    description: 'Wool-blend shell with satin lining. Ribbed cuffs, collar and hem. Minimal tonal embroidery at chest. The intersection of utility and ceremony.',
    vendor: 'VOID',
    productType: 'Outerwear',
    tags: ['bomber', 'jacket', 'wool', 'outerwear'],
    images: [
      { url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80', altText: 'Axis Bomber Jacket' },
      { url: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=80', altText: 'Axis Bomber Jacket Side' },
    ],
    variants: makeVariants(SIZES, '348.00'),
    options: [{ name: 'Size', values: SIZES }],
    priceRange: {
      minVariantPrice: { amount: '348.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '348.00', currencyCode: 'USD' },
    },
  },
  {
    id: 'prod-005',
    handle: 'eclipse-sweatshort',
    title: 'Eclipse Sweatshort',
    description: '350gsm loopback terry. Elasticated waist with internal drawstring. Tonal stitch detailing. Designed for the space between casual and considered.',
    vendor: 'VOID',
    productType: 'Bottoms',
    tags: ['shorts', 'sweat', 'essentials'],
    images: [
      { url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80', altText: 'Eclipse Sweatshort' },
      { url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80', altText: 'Eclipse Sweatshort Detail' },
    ],
    variants: makeVariants(SIZES, '88.00'),
    options: [{ name: 'Size', values: SIZES }],
    priceRange: {
      minVariantPrice: { amount: '88.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '88.00', currencyCode: 'USD' },
    },
  },
  {
    id: 'prod-006',
    handle: 'signal-longsleeve',
    title: 'Signal Longsleeve',
    description: '260gsm combed cotton. Relaxed fit with extended body length. Ribbed cuffs. Screen-printed tonal graphics on the back yoke. The quiet statement.',
    vendor: 'VOID',
    productType: 'Tops',
    tags: ['longsleeve', 'graphic', 'essentials'],
    images: [
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', altText: 'Signal Longsleeve' },
      { url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80', altText: 'Signal Longsleeve Back' },
    ],
    variants: makeVariants(SIZES, '118.00'),
    options: [{ name: 'Size', values: SIZES }],
    priceRange: {
      minVariantPrice: { amount: '118.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '118.00', currencyCode: 'USD' },
    },
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-001',
    handle: 'essentials',
    title: 'Essentials',
    description: 'The foundation. Core pieces built for longevity.',
    image: { url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80', altText: 'Essentials Collection' },
    products: PRODUCTS.filter(p => p.tags.includes('essentials')),
  },
  {
    id: 'col-002',
    handle: 'outerwear',
    title: 'Outerwear',
    description: 'The outer shell. Layers that define the silhouette.',
    image: { url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80', altText: 'Outerwear Collection' },
    products: PRODUCTS.filter(p => p.productType === 'Outerwear'),
  },
  {
    id: 'col-003',
    handle: 'bottoms',
    title: 'Bottoms',
    description: 'Below the waist. The foundation of the look.',
    image: { url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=1200&q=80', altText: 'Bottoms Collection' },
    products: PRODUCTS.filter(p => p.productType === 'Bottoms'),
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return PRODUCTS.find(p => p.handle === handle);
}

export function getCollectionByHandle(handle: string): Collection | undefined {
  return COLLECTIONS.find(c => c.handle === handle);
}

export function formatPrice(amount: string, currencyCode = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(parseFloat(amount));
}
