# VOID Studio — Premium Streetwear eCommerce

A full Next.js 14 eCommerce site with a luxury streetwear aesthetic. Built for Shopify Storefront API integration.

---

## Stack

- **Framework**: Next.js 14 (Pages Router)
- **Styling**: Tailwind CSS + custom CSS
- **Fonts**: Cormorant Garamond (display) + DM Sans (body) + DM Mono
- **State**: Zustand (cart persistence via localStorage)
- **Animations**: CSS transitions + keyframes
- **API-ready**: Shopify Storefront API client included

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Folder Structure

```
├── components/
│   ├── cart/
│   │   └── CartDrawer.tsx       # Slide-in cart panel
│   ├── layout/
│   │   ├── Navbar.tsx           # Sticky nav with mobile menu
│   │   └── Footer.tsx           # Footer with marquee
│   ├── product/
│   │   └── ProductCard.tsx      # Reusable product card
│   └── ui/
│       └── Cursor.tsx           # Custom cursor (desktop only)
├── lib/
│   ├── products.ts              # Mock data + types (Shopify-compatible)
│   ├── cart.ts                  # Zustand cart store
│   └── shopify.ts               # Shopify Storefront API client
├── pages/
│   ├── _app.tsx                 # App wrapper (nav, footer, cart)
│   ├── _document.tsx            # HTML document with fonts
│   ├── index.tsx                # Homepage
│   ├── cart.tsx                 # Cart page
│   ├── 404.tsx                  # Not found
│   ├── products/
│   │   ├── index.tsx            # Product listing (with filter/sort)
│   │   └── [handle].tsx         # Product detail page
│   └── collections/
│       └── [handle].tsx         # Collection page
├── styles/
│   └── globals.css              # Global styles, fonts, animations
├── tailwind.config.js
├── next.config.js
└── .env.local.example           # Shopify env vars template
```

---

## Shopify Integration

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Shopify store domain and Storefront API token
3. In `pages/products/index.tsx` and `pages/products/[handle].tsx`, replace the mock `getStaticProps` data fetching with calls to `shopifyFetch()` from `lib/shopify.ts`
4. Map Shopify's GraphQL response shape to the `Product` type in `lib/products.ts`

The `lib/shopify.ts` file includes ready-to-use GraphQL queries for:
- `GET_PRODUCTS_QUERY` — fetch product list
- `GET_PRODUCT_QUERY` — fetch single product by handle
- `CREATE_CART_MUTATION` — create Shopify cart and get checkout URL

---

## Design System

| Token | Value |
|-------|-------|
| `--void` | `#080808` background |
| `--ash` | `#111111` card/surface |
| `--smoke` | `#1a1a1a` |
| `--accent` | `#c8a96e` gold |
| `--bone` | `#f0ede8` primary text |
| `--mist` | `#888888` secondary text |

Fonts are loaded via Google Fonts:
- Display: **Cormorant Garamond** — editorial serif
- Body: **DM Sans** — clean grotesque
- Mono: **DM Mono** — labels, prices, tags

---

## Features

- ✅ Custom animated cursor (desktop)
- ✅ Sticky nav with scroll detection
- ✅ Full-screen mobile menu
- ✅ Slide-in cart drawer
- ✅ Persistent cart (localStorage via Zustand)
- ✅ Product image swap on hover
- ✅ Size selection with availability states
- ✅ Add to cart with feedback
- ✅ Related products
- ✅ Collection pages
- ✅ Filter + sort on listing page
- ✅ Animated marquee bar
- ✅ Email capture section
- ✅ Accordion product details
- ✅ Noise texture overlay
- ✅ Grid background texture
- ✅ Custom scrollbar
- ✅ ::selection styling
- ✅ Fully responsive (mobile + desktop)
- ✅ Shopify Storefront API client ready
