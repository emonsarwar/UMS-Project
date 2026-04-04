import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
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
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        hero: 'var(--gradient-hero)',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideIn: 'slideIn 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      screens: {
        xs: '320px',
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
  // Performance optimization: remove unused CSS in production
  safelist: [
    {
      pattern: /^(bg|text|border|shadow)-(primary|secondary|accent|surface)/,
      variants: ['hover', 'focus', 'disabled'],
    },
  ],
}

export default config
