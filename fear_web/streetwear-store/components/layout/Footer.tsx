// components/layout/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ash border-t border-white/5 mt-32">
      {/* Marquee */}
      <div className="border-b border-white/5 overflow-hidden py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="font-display text-4xl text-white/5 tracking-widest mr-16">
              VOID STUDIO — FREE SHIPPING OVER $200 — LIMITED DROPS — PREMIUM BASICS —
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-display text-5xl text-bone font-light tracking-widest mb-6">VOID</div>
            <p className="font-body text-sm text-mist leading-relaxed max-w-xs">
              Premium streetwear built for those who exist between definitions. Every piece is a question without an answer.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="font-mono text-xs tracking-ultra uppercase text-mist mb-6">Navigate</div>
            <div className="flex flex-col gap-4">
              {[
                { href: '/products', label: 'All Products' },
                { href: '/collections/essentials', label: 'Essentials' },
                { href: '/collections/outerwear', label: 'Outerwear' },
                { href: '/collections/bottoms', label: 'Bottoms' },
              ].map(l => (
                <Link key={l.href} href={l.href} className="font-body text-sm text-ghost/60 hover:text-bone transition-colors duration-300 link-underline w-fit">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-xs tracking-ultra uppercase text-mist mb-6">Support</div>
            <div className="flex flex-col gap-4">
              {['Sizing Guide', 'Shipping & Returns', 'Care Instructions', 'Contact Us'].map(l => (
                <span key={l} className="font-body text-sm text-ghost/60 hover:text-bone transition-colors duration-300 link-underline w-fit cursor-pointer">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="font-mono text-xs text-mist/50 tracking-wide">
            © 2024 VOID Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {['Instagram', 'Twitter', 'TikTok'].map(s => (
              <span key={s} className="font-mono text-xs text-mist/50 hover:text-accent transition-colors duration-300 cursor-pointer tracking-wide">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
