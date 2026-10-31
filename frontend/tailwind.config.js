/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: {
            DEFAULT: "#FF6B00",
            hover: "#E05E00",
            light: "#FFF3EB",
          },
          blue: {
            DEFAULT: "#1E40AF",
            dark: "#0F172A",
            navy: "#0A0F1D",
            surface: "#1E293B",
            light: "#EFF6FF",
          },
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Segoe UI", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(255, 107, 0, 0.25)",
        "blue-glow": "0 0 30px rgba(30, 64, 175, 0.25)",
      },
    },
  },
  plugins: [],
};

