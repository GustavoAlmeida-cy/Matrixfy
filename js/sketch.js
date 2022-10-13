// Characters sets
const charSets = [".:-i|=+%0#@", "Ñ@#W$9876543210?!abc;:+=-,._ "];

// console.log(body);

// - charSets
let set = 0;

// - colorful on/off
let colorful = false;

// - letters color
let charColor = "rgb(0,255,0)";

// - invert on/off
let invert = false;
let invertValue = 0;

// - density
let density = 125;

// - background on/off, - background color
let bgColor = false;
let bgColorValue = "rgb(0,0,0)";

let canvas;
let video;

// - reset
function resetValues() {
  set = 0;
  colorful = false;
  charColor = "rgb(0,255,0)";
  invert = false;
  invertValue = 0;
  density = 125;
  bgColor = false;
  bgColorValue = "rgb(0,0,0)";
}

function setup() {
  canvas = createCanvas(700, 700);
  video = createCapture(VIDEO);
  video.size(50, 50);
  video.hide();
}

function draw() {
  if (bgColor) {
    clear();
    background(bgColorValue);
  } else {
    clear();
  }

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

      if (colorful) {
        fill(r, g, b);
      } else {
        fill(charColor);
      }

      textSize(w);
      textAlign(CENTER, CENTER);

      let len = charSets[set].length;

      if (invert) {
        invertValue = len;
        len = 0;
      } else {
        invertValue = 0;
        len = charSets[set].length;
      }

      const charIndex = floor(map(avg, 0, density, len, invertValue));

      // Draw
      text(charSets[set].charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
    }
  }
  // console.log(floor(frameRate()));

  // function saveAsImage() {
  //   save("myImage.png");
  // }

  // htmlElement.mousePressed(saveAsImage);
}
