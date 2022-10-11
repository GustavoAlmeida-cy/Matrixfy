const density = "Ñ@#W$9876543210?!abc;:+=-,._              ";
// const density = " .:-i|=+%0#@";

let img;
let dropzone;
let body;

function preload() {
  img = loadImage("../neo.jpg");
}

function setup() {
  createCanvas(600, 600);
  img.resize(50, 50);
  dropzone = select("main");
  body = select("body");
}

function draw() {
  clear();

  dropzone.dragOver(highlight);
  dropzone.dragLeave(unHighlight);
  dropzone.drop(getFile, unHighlight);

  function highlight() {
    dropzone.style("background-color", "rgba(255,255,255,0.1");
  }

  function unHighlight() {
    dropzone.style("background-color", "rgba(0,0,0,0");
  }

  function getFile(file) {
    img = loadImage(file.data);
  }

  img.resize(50, 50);

  let w = width / img.width;
  let h = height / img.height;

  img.loadPixels();

  for (let j = 0; j < img.height; j++) {
    for (let i = 0; i < img.width; i++) {
      const pixelIndex = (i + j * img.width) * 4;
      const r = img.pixels[pixelIndex + 0];
      const g = img.pixels[pixelIndex + 1];
      const b = img.pixels[pixelIndex + 2];

      const avg = (r + g + b) / 3;

      fill(r, g, b);
      textSize(w);
      textAlign(CENTER, CENTER);

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));

      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
    }
  }
}
