/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sky-blue': '#D1DCF0',
        'btn-blue': '#A5C3DD',
        'lgt-blue': '#EAF1F7',
        'mid-blue': '#D7E5F0',
        'drk-mid-blue': '#B6CFE3',
        'drk-blue': '#24425C',
        'drk-2-blue': '#3F719E',
        'btm-blue': '#A5C3DD',
      }
    },
  },
  plugins: [],
}

