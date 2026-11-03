/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-mono)", "ui-monospace", "monospace"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        flicker: {
          "0%, 7%, 9%, 11%, 100%": { opacity: "1" },
          "8%, 10%": { opacity: "0.35" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.7)" },
        },
      },
      animation: {
        flicker: "flicker 6s linear infinite",
        "spin-slow": "spin-slow 4s linear infinite",
        "spin-slower": "spin-slow 9s linear infinite reverse",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
      },
    },
    colors: {
      ...colors,
      primary: colors.purple,
      secondary: colors.pink,
      // blues sampled from the EZ lightning emblem
      electric: {
        100: "#D6F3FF",
        300: "#54CAEB",
        500: "#1B9AF3",
        700: "#1269D8",
        900: "#174AA1",
      },
      // jet-black surfaces
      ink: {
        950: "#000000",
        900: "#060607",
        800: "#0C0D0F",
        700: "#16181B",
        600: "#25282D",
      },
    },
  },
  plugins: [],
};
