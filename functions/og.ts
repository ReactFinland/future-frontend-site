import breeze from "breezewind";
import {
  ConverterOptions,
  ConvertOptions,
  initialize,
  svg2png,
} from "svg2png-wasm";
import wasm from "svg2png-wasm/svg2png_wasm_bg.wasm";
// import wasm from "./svg2png_wasm_bg.wasm";
import meta from "../site/meta.json" assert { type: "json" };
import ogTemplate from "../site/layouts/og.json" assert { type: "json" };

// https://github.com/cloudflare/workers-types
export async function onRequest(context) {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;
  const svg = await breeze({
    component: ogTemplate,
    components: {},
    context: { ...meta, meta: { title: "Future Frontend", subtitle: "Demo" } },
  });

  // TODO: Convert SVG to PNG
  /*
  await initialize(wasm).catch(() => {});
  const options: ConverterOptions & ConvertOptions = {
    ...getOptionsFromUrl(req.url),
    fonts: await Promise.all([new Uint8Array(roboto)]),
    defaultFontFamily: {
      sansSerifFamily: 'Roboto',
      serifFamily: 'Roboto',
      cursiveFamily: 'Roboto',
      fantasyFamily: 'Roboto',
      monospaceFamily: 'Roboto',
    },
  };
  */

  return new Response(svg, {
    status: 200,
    headers: { "content-type": "image/svg+xml" },
  });
}
