/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF7',
          100: '#F9F6EE',
          200: '#F3EDE2',
          300: '#E8DEC8',
          400: '#D5C4A1',
          500: '#B8A078',
        },
        booth: {
          black: '#141414',
          dark: '#1C1A17',
          charcoal: '#2B2824',
          paper: '#FBF9F5',
          cream: '#F4EFE6',
          vintage: '#EFE7DA',
          blush: '#FBE8E6',
          rose: '#E88B88',
          sage: '#8F9E8B',
          sepia: '#704214',
          film: '#11100E',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Fraunces"', '"Playfair Display"', 'Georgia', 'serif'],
        typewriter: ['"Courier Prime"', '"Courier New"', 'monospace'],
        handwriting: ['"Caveat"', '"Indie Flower"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'photo': '0 4px 20px -2px rgba(0, 0, 0, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.08)',
        'strip': '0 10px 30px -5px rgba(0, 0, 0, 0.25), 0 4px 10px -2px rgba(0, 0, 0, 0.15)',
        'polaroid': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      },
      animation: {
        'flash': 'flash 0.5s ease-out',
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-subtle': 'pulseSubtle 2s infinite',
      },
      keyframes: {
        flash: {
          '0%': { opacity: '0.95' },
          '100%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
};
