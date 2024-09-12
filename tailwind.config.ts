import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6500E0",
        secondary: "#425D8A",
        background: "#EEEEEE",
        "gray-1": "#8E8E93",
        "gray-2": "#4F4F4F",
        "gray-3": "#828282",
        "gray-6": "#F2F2F2",
      },
      screens: {
        xs: "320px", // Small mobile devices
        sm: "425px", // Slightly larger mobile devices
        md: "768px", // Tablets and larger screens
        lg: "976px", // Laptops and larger screens
        xl: "1440px", // Desktops
        "2xl": "1920px", // Large desktops
        "3xl": "2560px", // Ultra-wide screens
        "4xl": "3200px", // Extra-large screens
      },
      boxShadow: {
        custom: "0 0 10px rgba(0, 0, 0, 0.07)",
        "custom-1": "0 0 10px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(135 135 135) rgb(247 247 247)",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgb(247 247 247)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(135 135 135)",
            borderRadius: "4px",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover", "focus"]);
    },
  ],
};
export default config;
