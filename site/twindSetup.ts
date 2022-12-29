import presetAutoprefix from "https://esm.sh/@twind/preset-autoprefix@1.0.5";
import presetTailwind from "https://esm.sh/@twind/preset-tailwind@1.1.1";
import presetTypography from "https://esm.sh/@twind/preset-typography@1.0.5";

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
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f0349", // "#4a25f5",
        secondary: "#84ebec",
        tertiary: "#d239f6",
      },
      fontFamily: {
        "primary": '"Eau"',
        "monospace": "monospace",
      },
    },
  },
  preflight: {
    "@font-face": [
      {
        fontFamily: "Eau",
        fontDisplay: "swap",
        fontWeight: "400",
        src: 'system-ui, url(/fonts/eau_sans_book.woff2) format("woff2")',
      },
    ],
  },
};
