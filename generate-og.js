const sharp = require("sharp")

sharp("./complex.svg")
  .png()
  .toFile("./build/og.png")
  .then(function(info) {
    console.log(info)
  })
  .catch(function(err) {
    console.log(err)
  })
