import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "var(--color-primary-dark)",
        primary: "var(--color-primary)",
        primaryLight: "var(--color-primary-light)",
        cta: "var(--color-cta)",
        promo: "var(--color-promo)",
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        textSecondary: "var(--color-text-secondary)",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, .08)",
      },
    },
  },
  plugins: [],
};

export default config;
