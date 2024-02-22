import presetAutoprefix from "https://esm.sh/@twind/preset-autoprefix@1.0.5";
import presetTailwind from "https://esm.sh/@twind/preset-tailwind@1.1.1";
import presetTypography from "https://esm.sh/@twind/preset-typography@1.0.5";
import meta from "./meta.json" assert { type: "json" };

export default {
  presets: [presetAutoprefix(), presetTailwind(), presetTypography()],
  plugins: {
    btn: "font-bold py-2 px-4 rounded",
    "btn-blue": "bg-blue-500 hover:bg-blue-700 text-white",
    "btn-muted": "font-light text-gray-500",
  },
  rules: [
    // https://twind.style/rules#static-rules
    ["mask-text-black", { color: "transparent", textShadow: "0 0 black" }],
    ["mask-text-gray", { color: "transparent", textShadow: "0 0 gray" }],
    // https://stackoverflow.com/a/4919231/228885
    ["text-outline", {
      textShadow:
        "-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black",
    }],
    ["bg-header", {
      // TODO: Calculate this instead. Likely a pure DOM (even Shadow DOM) solution would be far better.
      backgroundImage: `linear-gradient(to right,
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
    }],
    ["bg-white-gradient", {
      backgroundImage:
        "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.2) 65%, rgba(255,255,255,1) 100%)",
    }],
  ],
  theme: {
    extend: {
      colors: meta.colors,
      fontFamily: {
        "primary": 'system-ui, "Eau"',
        "monospace": "monospace",
      },
      backgroundImage: {
        // bg-map - Define this if you want a static fallback for the venue map
        // "map": "url(/images/map.png)",
      },
    },
  },
  preflight: {
    "@font-face": [
      {
        fontFamily: "Eau",
        fontDisplay: "swap",
        fontWeight: "400",
        src: 'url(/fonts/eau_sans_book.woff2) format("woff2")',
      },
    ],
  },
  hash: false,
};
