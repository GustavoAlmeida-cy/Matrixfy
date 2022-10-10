// Charset variables
const charSet = "Ñ@#W$9876543210?!abc;:+=-,._                ";
// const charSet = ".:-i|=+%0#@";

let img;

function preload() {
  img = loadImage("../images/arch.png");
}

function setup() {
  createCanvas(500, 500);
  img.resize(50, 50);

  let w = width / img.width;
  let h = height / img.height;

  img.loadPixels();

  // Main feature
  for (let i = 0; i < img.height; i++) {
    // Column
    for (let j = 0; j < img.width; j++) {
      // Row
      const pixelIndex = (i + j * img.width) * 4; // Get pixels index

      // Get pixels colors
      const r = img.pixels[pixelIndex + 0];
      const g = img.pixels[pixelIndex + 1];
      const b = img.pixels[pixelIndex + 2];

      // Gray scale
      const avg = (r + g + b) / 3;

      fill(225);

      // Pixels to Chars
      const len = charSet.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));

      // Text settings
      textSize(w);
      textAlign(CENTER, CENTER);
      text(charSet.charAt(charIndex), i * h + h * 0.5, j * w + w * 0.5);
    }
  }
}
