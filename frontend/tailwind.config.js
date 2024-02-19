import daisyui from "daisyui";
import { dark } from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  daisyui: {
    logs: false,
    themes: [
      {
        dark: {
          ...dark,
          "base-100": "#171717",
          primary: "#570df8",
          ".btn": {
            color: "rgba(255, 255, 255, 0.89)",
          },
        },
      },
    ],
  },
};
