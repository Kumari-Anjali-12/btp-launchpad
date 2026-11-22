/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // SAP Horizon Inspired Theme Palette
        sap: {
          blue: {
            50: '#f0f7ff',
            100: '#e0effe',
            200: '#bae0fd',
            300: '#7cc7fb',
            400: '#38aaf7',
            500: '#0070f2', // Brand Horizon Blue
            600: '#0058c6',
            700: '#0046a1',
            800: '#033b84',
            900: '#08326e',
            950: '#051f47',
          },
          gold: {
            50: '#fbf8eb',
            100: '#f6eece',
            400: '#e5b839',
            500: '#d99b16', // Horizon Accent Gold
            600: '#b8770e',
          },
          teal: {
            500: '#07838f',
            600: '#056973',
          },
          slate: {
            850: '#151e2e',
            900: '#0f172a',
            950: '#090d16',
          },
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Consolas',
          'Monaco',
          'Courier New',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
