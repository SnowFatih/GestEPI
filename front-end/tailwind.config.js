// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ecf1fa',
          200: '#dbe2f5',
          300: '#c7d6f0',
          400: '#9fb7e8',
          500: '#8eabe3',
          600: '#7d9ee0',
          700: '#6990da',
          800: '#4A5599',
          900: '#0B1167'
        },
        secondary: {
          100: '#ef664C',
          200: '#ef664C',
          300: '#ef664C',
          400: '#ef664C',
          500: '#ef664C',
          600: '#ef664C',
          700: '#ef664C',
          800: '#ef664C',
          900: '#ef664C'
        },
        background: '#fff'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        '16/9': '16 / 9',
        '9/16': '9 / 16'
      },
      spacing: {
        extraSmall: '0.5rem',
        small: '1rem',
        lightBase: '1.25rem',
        base: '1.5rem',
        largeBase: '1.75rem'
      },
      boxShadow: {
        custom: '1px 5px 6px 1px rgba(0, 0, 0, 0.2)',
        customHover: '1px 5px 6px 1px rgba(0, 0, 0, 0.3)'
      },
      backgroundImage: {
        'hero-pattern':
          "linear-gradient(to top, rgba(255, 255, 255, 0.5), rgba(85, 233, 117, 0.9)), url(\"data:image/svg+xml,%3Csvg width='70' height='70' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 0h35v35H0V0zm5 5h25v25H5V5zm5 5h15v15H10V10zm5 5h5v5h-5v-5zM40 5h25v25H40V5zm5 5h15v15H45V10zm5 5h5v5h-5v-5zM70 35H35v35h35V35zm-5 5H40v25h25V40zm-5 5H45v15h15V45zm-5 5h-5v5h5v-5zM30 40H5v25h25V40zm-5 5H10v15h15V45zm-5 5h-5v5h5v-5z'/%3E%3C/g%3E%3C/svg%3E\")"
      }
    }
  },
  keyframes: {
    open: {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    },
    close: {
      '0%': {
        opacity: 1
      },
      '100%': {
        opacity: 0
      }
    },
    active: {
      '0%': {
        scale: 0.1,
        'box-shadow': '(0px 0px 0px 1px #ed1f34)',
        opacity: 1
      },
      '100%': {
        scale: 2.5,
        opacity: 0
      }
    }
  },
  animation: {
    open: 'shimmer 0.3s linear',
    close: 'shimmer 0.3s linear',
    active: 'active 2s infinite linear'
  },
  safelist: [
    {
      pattern: /aspect-(auto|square|video|[16/9]|[9/16]|[3/4]|[4/3])/
    }
  ],
  plugins: [require('@tailwindcss/forms')]
};
