/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        void: '#080808',
        ash: '#111111',
        smoke: '#1a1a1a',
        zinc: '#242424',
        mist: '#888888',
        ghost: '#cccccc',
        bone: '#f0ede8',
        cream: '#faf8f5',
        accent: '#c8a96e',
        'accent-dim': '#8a7048',
      },
      letterSpacing: {
        'ultra': '0.3em',
        'mega': '0.5em',
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
