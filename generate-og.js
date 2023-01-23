const path = require('path')
const { default: breeze } = require('breezewind')
const sharp = require("sharp")
const routes = require('./build/routes.json')
const ogTemplate = require('./site/layouts/og.json')
const meta = require('./site/meta.json')

// TODO: Figure out why custom fonts don't get loaded on Cloudflare Pages
// At least FONTCONFIG_PATH is set but that doesn't seem to be enough and
// it's unclear how to debug that the font was loaded.
//
// Docs: https://sharp.pixelplumbing.com/install#fonts
async function generateOpengraphImages() {
  // TODO: This could be parallelized
  for await (const [name, route] of Object.entries(routes)) {
    if (!name.endsWith('.html') && !name.endsWith('.xml')) {
      const svg = await breeze({
        component: ogTemplate,
        components: {},
        // TODO: Clean this up by applying utility (object case) with the function from breezewind
        context: { ...meta, meta: { title: 'Future Frontend', subtitle: name !== '/' ? typeof route.meta.title === 'object' ? route.context.document.data.title : route.meta.title : '' }}
      })
      const outputPath = path.join(process.cwd(), 'build', name, 'og.png')

      await sharp(Buffer.from(svg)).png().toFile(outputPath)
    }
  }
}

generateOpengraphImages();
