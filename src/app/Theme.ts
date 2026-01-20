// src/app/Theme.ts
// Website Theme System - Design Tokens

export const colors = {
  // 1. Primary: Blue (Trustworthy, Professional)
  primary: {
    50: "#eff6ff",
    100: "#dbeafe", // Icon backgrounds
    200: "#bfdbfe", // Borders, Light text
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb", // Accents, Icons
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a", // CTA Background, Primary buttons
    950: "#172554",
  },

  // 2. Secondary: Purple (Modern, Creative)
  secondary: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea", // Vision Icon accent
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
  },

  // 3. Neutral: Slate (Cool Gray - เข้ากับสีน้ำเงิน)
  neutral: {
    50: "#f8fafc", // Page Background
    100: "#f1f5f9", // Card Background
    200: "#e2e8f0", // Borders / Dividers
    300: "#cbd5e1", // Disabled states
    400: "#94a3b8", // Secondary Text
    500: "#64748b",
    600: "#475569", // Body Text
    700: "#334155", // Headings
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },

  // 4. Semantic: Functional colors
  semantic: {
    success: "#10b981", // Emerald-500
    warning: "#f59e0b", // Amber-500
    error: "#ef4444", // Red-500
    info: "#3b82f6", // Blue-500
  },
};

export const typography = {
  fontFamily: {
    sans: ["Prompt", "sans-serif"],
    heading: ["Kanit", "sans-serif"],
  },
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },
  fontWeights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeights: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
};

export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
};

export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  md: "0.375rem", // 6px - Buttons/Inputs
  lg: "0.5rem", // 8px - Cards
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  full: "9999px", // Pills / Avatars
};

export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
};

// Combined Theme Export
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export default theme;
