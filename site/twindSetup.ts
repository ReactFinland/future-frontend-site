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
      backgroundImage: "url('/images/quantum-gradient.svg')",
      backgroundSize: "cover",
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
