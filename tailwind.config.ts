import { type Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#F97316",
        success: "#10B981",
        danger: "#EF4444",
        background: "#F3F4F6",
        card: "#FFFFFF",
        text: "#111827",
        textSecondary: "#6B7280",
        border: "#D1D5DB",
      },
    },
  },
} satisfies Config;
