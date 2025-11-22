/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'academic-blue': {
          '50': '#EFF6FF',
          '100': '#DBEAFE',
          '200': '#BFDBFE',
          '300': '#93C5FD',
          '400': '#60A5FA',
          '500': '#3B82F6', // Azul brillante
          '600': '#2563EB', // Azul moderno (principal)
          '700': '#1D4ED8', // Azul académico
          '800': '#1E40AF',
          '900': '#1E3A8A',
        },
      },
    },
  },
  plugins: [],
  // Important: Preserve PrimeNG styles
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to avoid conflicts with PrimeNG
  },
}

