/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    logs: false,
    themes: ["coffee"],
  },
  plugins: [require("daisyui")],
};
