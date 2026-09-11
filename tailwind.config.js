/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px'
      },
      colors: {
        'brand-black': '#080808',
        'brand-dark': '#101010',
        'brand-warm-dark': '#1A1410',
        'brand-surface': '#211812',
        'brand-warm': '#5A4028',
        'brand-gold': '#D6A73A',
        'brand-gold-bright': '#F0C75E',
        'brand-blue': '#2563FF',
        'brand-text': '#F5F5F5',
        'brand-text-secondary': '#A3A3A3',
        
        // Legacy aliases for backward compatibility
        surface: '#211812',
        surfaceSoft: '#1A1410',
        accent: '#D6A73A',
        accentSoft: '#2563FF'
      },
      fontFamily: {
        display: ['system-ui', 'sans-serif'],
        body: ['system-ui', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace']
      },
      boxShadow: {
        glow: '0 20px 60px rgba(214, 167, 58, 0.08)',
        soft: '0 18px 45px rgba(0, 0, 0, 0.25)',
        'gold-glow': '0 0 20px rgba(214, 167, 58, 0.12)',
        'blue-glow': '0 0 20px rgba(37, 99, 255, 0.12)',
        'brown-glow': '0 0 28px rgba(90, 64, 40, 0.12)'
      },
      backgroundImage: {
        'grain': 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 seed=%271%27 /%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27 /%3E%3C/filter%3E%3Crect width=%27256%27 height=%27256%27 fill=%27%23fff%27 filter=%27url(%23noise)%27 opacity=%270.02%27/%3E%3C/svg%3E")'
      }
    }
  },
  plugins: []
};
