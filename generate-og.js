const path = require('path')
const { default: breeze } = require('breezewind')
const sharp = require("sharp")
const routes = require('./build/routes.json')
const ogTemplate = require('./site/layouts/og.json')
const meta = require('./site/meta.json')

async function generateOpengraphImages() {
  for await (const [name, route] of Object.entries(routes)) {
    if (!name.endsWith('.html') && !name.endsWith('.xml')) {
      const svg = await breeze({
        component: ogTemplate,
        components: {},
        context: { ...meta, meta: { title: 'Future Frontend', subtitle: name !== '/' ? route.meta.title : '' }}
      })
      const outputPath = path.join(process.cwd(), 'build', name, 'og.png')

      await sharp(Buffer.from(svg)).png().toFile(outputPath)
    }
  }

  // TODO: Use breezewind template to generate og.png for each route within the
  // build directory. Maybe a good option would be to ask all routes from
  // gustwind first.
  /*
  sharp("./complex.svg")
    .png()
    .toFile("./build/og.png")
  */
}

generateOpengraphImages();
