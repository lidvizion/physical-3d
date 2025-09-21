/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'arcade-dark': '#050A18',
        'arcade-purple': '#7B68EE',
        'arcade-pink': '#D946EF',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float-right': 'float-right 12s ease-in-out infinite',
        'float-left': 'float-left 10s ease-in-out infinite',
        'pulse-delayed': 'pulse-delayed 6s ease-in-out infinite 2s',
        'drift': 'drift 15s linear infinite',
        'drift-reverse': 'drift-reverse 18s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-slow': {
          '0%, 100%': { 
            opacity: '0.3',
            transform: 'scale(1)',
          },
          '50%': { 
            opacity: '0.6',
            transform: 'scale(1.05)',
          },
        },
        'float-right': {
          '0%': { 
            transform: 'translateX(-50px) translateY(-20px) scale(0.8)',
            opacity: '0.2',
          },
          '50%': { 
            transform: 'translateX(0px) translateY(-40px) scale(1.1)',
            opacity: '0.4',
          },
          '100%': { 
            transform: 'translateX(50px) translateY(-20px) scale(0.9)',
            opacity: '0.2',
          },
        },
        'float-left': {
          '0%': { 
            transform: 'translateX(30px) translateY(20px) scale(0.9)',
            opacity: '0.3',
          },
          '50%': { 
            transform: 'translateX(-20px) translateY(-10px) scale(1.05)',
            opacity: '0.5',
          },
          '100%': { 
            transform: 'translateX(40px) translateY(25px) scale(0.8)',
            opacity: '0.2',
          },
        },
        'pulse-delayed': {
          '0%, 100%': { 
            opacity: '0.2',
            transform: 'scale(1)',
          },
          '25%': { 
            opacity: '0.4',
            transform: 'scale(1.1)',
          },
          '75%': { 
            opacity: '0.3',
            transform: 'scale(0.95)',
          },
        },
        'drift': {
          '0%': { 
            transform: 'translateX(0) translateY(0) rotate(0deg)',
            opacity: '0.3',
          },
          '33%': { 
            transform: 'translateX(20px) translateY(-15px) rotate(120deg)',
            opacity: '0.5',
          },
          '66%': { 
            transform: 'translateX(-10px) translateY(-30px) rotate(240deg)',
            opacity: '0.4',
          },
          '100%': { 
            transform: 'translateX(0) translateY(0) rotate(360deg)',
            opacity: '0.3',
          },
        },
        'drift-reverse': {
          '0%': { 
            transform: 'translateX(0) translateY(0) rotate(360deg)',
            opacity: '0.2',
          },
          '33%': { 
            transform: 'translateX(-15px) translateY(20px) rotate(240deg)',
            opacity: '0.4',
          },
          '66%': { 
            transform: 'translateX(25px) translateY(10px) rotate(120deg)',
            opacity: '0.3',
          },
          '100%': { 
            transform: 'translateX(0) translateY(0) rotate(0deg)',
            opacity: '0.2',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '4rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 30px rgba(59, 130, 246, 0.4)',
      },
    },
  },
  plugins: [],
}
