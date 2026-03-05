/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        backgroundAlt: '#111111',
        gold: {
          DEFAULT: '#C9A84C',
          soft: '#E8C96D'
        },
        cta: {
          greenPrimary: '#3EA136',
          greenSecondary: '#2ECC71'
        },
        nps: {
          detrator: '#d9534f',
          neutro: '#f0ad4e',
          promotor: '#5cb85c'
        },
        textMain: '#FFFFFF',
        textSecondary: '#A0A0A0'
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif', 'Arial']
      },
      boxShadow: {
        soft: '0 18px 45px rgba(0,0,0,0.45)'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      }
    }
  },
  plugins: []
};

