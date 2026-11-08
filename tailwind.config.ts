import type { Config } from "tailwindcss";

// JKV Prime colour palette (from JKV_Prime_Colour_Palette.xlsx)
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1630", // Primary – main background
          2: "#0F1E3D", // cards, package boxes
          3: "#152A54", // raised panels, gradients
          4: "#1C3566", // hover states, borders
          footer: "#07102A",
        },
        teal: {
          DEFAULT: "#16B8A6", // Secondary – buttons, accents
          bright: "#3FE3C6", // glow, highlighted text on navy
          hover: "#13A596",
          tint: "rgba(22,184,166,0.12)",
        },
        offwhite: "#F4F7FA",
        ink: {
          body: "#4A5873", // body text on light
          muted: "#7A87A0", // muted text on light
          divider: "#DFE5EE",
        },
        mist: {
          body: "#A9B5CC", // body text on dark
          muted: "#6F7E9C", // muted text on dark
        },
        up: "#2FD38A",
        down: "#F2616D",
        amber: "#F2B544",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { site: "1240px" },
    },
  },
  plugins: [],
};
export default config;
