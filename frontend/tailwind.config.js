/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        accent: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        surface: 'var(--surface)',
        'surface-dark': 'var(--surface-dark)',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(201,168,76,0.6), 0 20px 60px rgba(201,168,76,0.18)',
        glass: '0 20px 60px rgba(10, 15, 44, 0.25)',
      },
      backgroundImage: {
        hero: 'var(--gradient-hero)',
      },
    },
  },
  plugins: [],
}
