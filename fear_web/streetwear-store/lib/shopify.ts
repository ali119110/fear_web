// lib/shopify.ts
// Shopify Storefront API integration layer
// Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in .env.local

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';
const apiVersion = '2024-01';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

type ShopifyFetchParams = {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
};

export async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
}: ShopifyFetchParams): Promise<T> {
  if (!domain || !storefrontToken) {
    throw new Error('Shopify env vars not set. Using mock data.');
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// ----- GraphQL Queries -----

export const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        handle
        title
        description
        vendor
        productType
        tags
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        images(first: 5) {
          nodes { url altText }
        }
        variants(first: 20) {
          nodes {
            id
            title
            price { amount currencyCode }
            availableForSale
            selectedOptions { name value }
          }
        }
        options { name values }
      }
    }
  }
`;

export const GET_PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      vendor
      productType
      tags
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      images(first: 10) {
        nodes { url altText }
      }
      variants(first: 30) {
        nodes {
          id
          title
          price { amount currencyCode }
          availableForSale
          selectedOptions { name value }
        }
      }
      options { name values }
    }
  }
`;

export const CREATE_CART_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise { ... on ProductVariant { id title price { amount } } }
          }
        }
        cost { totalAmount { amount currencyCode } }
      }
    }
  }
`;
