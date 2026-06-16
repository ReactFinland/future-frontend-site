import tailwindTypography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin.js";

export default {
  content: [
    "./site/**/*.{html,ts,js}",
    "./content/**/*.md",
    "./blogPosts/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        secondary: "#AAA",
        tertiary: "#000",
        navigation: "#FFF",
      },
      fontFamily: {
        primary: ['"Finlandica Headline"', "system-ui"],
        monospace: ["monospace"],
      },
      letterSpacing: {
        1: "0.01em",
      },
      minWidth: {
        10: "10rem",
        20: "20rem",
      },
      backgroundImage: {
        header: `linear-gradient(to right,
          rgba(6,0,0,1) 0%,
          rgba(6,0,0,1) 9.9%,
          rgba(28,2,7,1) 10%,
          rgba(28,2,7,1) 19.9%,
          rgba(47,4,13,1) 20%,
          rgba(47,4,13,1) 29.9%,
          rgba(66,8,27,1) 30%,
          rgba(66,8,27,1) 39.9%,
          rgba(87,13,37,1) 40%,
          rgba(87,13,37,1) 49.9%,
          rgba(107,19,56,1) 50%,
          rgba(107,19,56,1) 59.9%,
          rgba(128,25,79,1) 60%,
          rgba(128,25,79,1) 69.9%,
          rgba(148,31,107,1) 70%,
          rgba(148,31,107,1) 79.9%,
          rgba(167,38,138,1) 80%,
          rgba(167,38,138,1) 89.9%,
          rgba(186,44,171,1) 90%,
          rgba(186,44,171,1) 100%)`,
        "white-gradient":
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.2) 65%, rgba(255,255,255,1) 100%)",
      },
    },
  },
  plugins: [
    tailwindTypography,
    plugin(({ addBase, addUtilities }) => {
      addBase({
        "@font-face": {
          fontFamily: '"Finlandica Headline"',
          src: 'url(/fonts/Finlandica-subset.ttf) format("ttf")',
        },
      });

      addUtilities({
        ".mask-text-black": {
          color: "transparent",
          textShadow: "0 0 black",
        },
        ".mask-text-gray": {
          color: "transparent",
          textShadow: "0 0 gray",
        },
        ".text-outline": {
          textShadow:
            "-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black",
        },
        ".hr-variant-1": {
          "-webkit-transform": "rotate(-1deg)",
          transform: "rotate(-1deg)",
          color: "black",
          border: "solid black",
          borderWidth: "2px 0 0 0",
        },
        ".hr-variant-2": {
          "-webkit-transform": "rotate(1deg)",
          transform: "rotate(1deg)",
          color: "black",
          border: "solid black",
          borderWidth: "2px 0 0 0",
        },
        ".hr-variant-3": {
          color: "black",
          border: "solid black",
          borderWidth: "4px 0 0 0",
        },
      });
    }),
  ],
};
