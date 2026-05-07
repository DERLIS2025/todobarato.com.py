import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "var(--color-primary-dark)",
        primary: "var(--color-primary)",
        primaryLight: "var(--color-primary-light)",
        surfaceBlue: "var(--color-surface-blue)",
        surfaceMuted: "var(--color-surface-muted)",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(4, 8, 15, .08)",
      },
    },
  },
  plugins: [],
};

export default config;
