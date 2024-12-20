import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--revco-primary)",
        "primary-accent": "var(--revco-primary-accent)",
        secondary: "var(--revco-secondary)",
        "secondary-accent": "var(--revco-secondary-accent)",
        background: "#EEEEEE",
        "gray-1": "#8E8E93",
        "gray-2": "#4F4F4F",
        "gray-3": "#828282",
        "gray-4": "#DBDCDE",
        "gray-5": "#333333",
        "gray-6": "#F2F2F2",
        monokai: "#202224",
        error: "#FF4040",
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
      fontFamily: {
        inter: ["var(--font-inter)", "serif"],
        podkova: ["var(--font-podkova)", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
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
