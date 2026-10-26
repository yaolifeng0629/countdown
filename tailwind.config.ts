import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        surface: "var(--surface)",
        "surface-warm": "var(--surface-warm)",
        ink: "var(--ink)",
        secondary: "var(--ink-secondary)",
        cinnabar: "var(--cinnabar)",
        "cinnabar-deep": "var(--cinnabar-deep)",
        gold: "var(--gold)",
        "gold-bright": "var(--gold-bright)",
        warm: "var(--border-warm)",
        strong: "var(--border-strong)",
        footer: "var(--footer-bg)",
      },
      fontFamily: {
        serif: ["var(--font-serif-sc)", "Songti SC", "SimSun", "serif"],
        kai: ["var(--font-kai)", "Kaiti SC", "KaiTi", "cursive"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        sans: ["system-ui", "-apple-system", "PingFang SC", "Microsoft YaHei", "sans-serif"],
      },
      maxWidth: {
        section: "1200px",
      },
    },
  },
  plugins: [],
} satisfies Config;
