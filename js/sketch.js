// Characters sets
// const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
const density = ".:-i|=+%0#@";

let video;

function setup() {
  createCanvas(600, 600);
  video = createCapture(VIDEO);
  video.size(50, 50);
  video.hide();
}

function draw() {
  clear();

  video.loadPixels();

  let w = width / video.width;
  let h = height / video.height;

  // Get pixels index
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;

      // Colors
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];

      // Gray scale
      const avg = (r + g + b) / 3;

      fill("green");
      textSize(w);
      textAlign(CENTER, CENTER);

      const len = density.length;
      const charIndex = floor(map(avg, 0, 122, len, 0));

      // Draw
      text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
    }
  }
}
