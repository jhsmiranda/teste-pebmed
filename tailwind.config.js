/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "360px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1920px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        xs: ["10px", "13px"],
        sm: ["12px", "16px"],
        base: ["14px", "18px"],
        lg: ["16px", "21px"],
        xl: ["20px", "26px"],
      },
      colors: {
        "peb-primary": "#191847",
        "peb-secondary": "#F5850B",
        "peb-red": "#d72b2b",
        "peb-black": "#151516",
        "peb-gray-1": "#F4F3F6",
        "peb-gray-2": "#E1DEE8",
        "peb-gray-3": "#C9C5D4",
        "peb-gray-4": "#666173",
      },
    },
  },
  plugins: [],
};
