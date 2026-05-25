import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#071126",
          900: "#0b1733",
          850: "#102248",
          800: "#172f5d"
        },
        gold: {
          50: "#fff9e8",
          100: "#fff0c4",
          200: "#f7d77d",
          300: "#e6b758",
          400: "#cf9140",
          500: "#b87536",
          600: "#83502b"
        },
        sand: {
          50: "#fbf7ee",
          100: "#f5ead7",
          200: "#ead5af",
          300: "#d5b276"
        }
      },
      fontFamily: {
        arabic: ["var(--font-cairo)", "Tajawal", "Arial", "sans-serif"]
      },
      boxShadow: {
        gold: "0 20px 70px rgba(214, 159, 76, 0.22)",
        soft: "0 18px 60px rgba(7, 17, 38, 0.16)"
      },
      backgroundImage: {
        "gold-radial": "radial-gradient(circle at 50% 0%, rgba(230, 183, 88, 0.24), rgba(7, 17, 38, 0) 44%)",
        "premium-line": "linear-gradient(135deg, rgba(255, 240, 196, 0.42), rgba(255, 255, 255, 0.16))"
      }
    }
  },
  plugins: []
};

export default config;
