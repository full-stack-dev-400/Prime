import type { Config } from "tailwindcss";

// JKV Prime design system
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],

  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1630",
          2: "#0F1E3D",
          3: "#152A54",
          4: "#1C3566",
          footer: "#07102A",
        },

        teal: {
          DEFAULT: "#16B8A6",
          bright: "#3FE3C6",
          hover: "#13A596",
          tint: "rgba(22,184,166,0.12)",
        },

        offwhite: "#F4F7FA",

        ink: {
          body: "#4A5873",
          muted: "#7A87A0",
          divider: "#DFE5EE",
        },

        mist: {
          body: "#A9B5CC",
          muted: "#6F7E9C",
        },

        up: "#2FD38A",
        down: "#F2616D",
        amber: "#F2B544",
      },

      // Official JKV Prime typography
      fontFamily: {
        sans: ["Inter Variable", "Segoe UI", "Arial", "sans-serif"],

        mono: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },

      maxWidth: {
        site: "1240px",
      },
    },
  },

  plugins: [],
};

export default config;
