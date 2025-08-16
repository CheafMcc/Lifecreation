/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        text: "#111111",
        brand: "#FFD54F",
        spirit: "#3A86FF",
        phys: "#EF4444",
        intel: "#22C55E",
        free: "#6B7280",
      },
    },
  },
  plugins: [],
};
