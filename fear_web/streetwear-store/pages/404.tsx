// pages/404.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const NotFound: NextPage = () => (
  <>
    <Head><title>404 — VOID Studio</title></Head>
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="font-display text-[20vw] text-white/5 font-light leading-none select-none">
        404
      </div>
      <div className="-mt-8 relative z-10">
        <div className="font-mono text-xs tracking-ultra uppercase text-accent mb-4">— Lost in the Void</div>
        <h1 className="font-display text-4xl text-bone font-light mb-4">Page not found</h1>
        <p className="font-body text-sm text-mist mb-10">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link
          href="/"
          className="inline-block bg-bone text-void font-mono text-xs tracking-ultra uppercase px-10 py-4 hover:bg-accent transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  </>
);

export default NotFound;
