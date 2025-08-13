/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Für App Router
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Für Pages Router
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Falls du ein `src` Verzeichnis verwendest
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}