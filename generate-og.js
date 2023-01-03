const sharp = require("sharp")

// TODO: Use breezewind template to generate og.png for each route within the
// build directory. Maybe a good option would be to ask all routes from
// gustwind first.
sharp("./complex.svg")
  .png()
  .toFile("./build/og.png")
