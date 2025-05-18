// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-dark": "linear-gradient(to right top, #0c0c2b, #0f132a, #141828, #191c26, #1f2023)"
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0,0,0,0.15)',
        'avatar-inactive': '0px 0px 0px 2px rgba(83, 109, 254, 0.1)',
        'avatar-active': '0px 0px 0px 2px rgba(25,201,100, 0.8)',
        'done': '0px 0px 0px 2px rgba(25,201,100, 0.8)',
        'pendding': '0px 0px 0px 2px rgba(83, 109, 254, 0.8)',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    prefix: "planning",
    themes: {
      extend: {
        colors: {
        }
      },
      light: {
        colors: {
          background: "#ECEEF4",
          primary: {
            700: "#E3E6F8",
            300: '#CFD6FF',
            200: '#EBEDFF',
            100: '#F4F6FF',
            foreground: "#FFFFFF",
            DEFAULT: "#526DFE",
          },
          secondary: {
            400: "#51555B",
            300: '#838B95',
            200: '#C3C9D3',
            100: '#E0E3E9',
            foreground: "#FFFFFF",
            DEFAULT: "#1F2229",
          },
        },
      },
      dark: {
        colors: {
          background: "#202124",
          foreground: "#ECEDEE",
          default: {
            DEFAULT: "#3C4043",
            foreground: "#FFFFFF",
          },
          primary: {
            700: "#E3E6F8",
            300: '#CFD6FF',
            200: '#EBEDFF',
            100: '#F4F6FF',
            foreground: "#FFFFFF",
            DEFAULT: "#526DFE",
          },
          secondary: {
            400: "#51555B",
            300: '#838B95',
            200: '#C3C9D3',
            100: '#E0E3E9',
            foreground: "#FFFFFF",
            DEFAULT: "#1F2229",
          },
        }
      },
    },
  })]
}

export default config;