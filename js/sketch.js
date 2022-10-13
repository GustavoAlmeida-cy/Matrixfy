// Characters sets
const charSets = [".:-i|=+%0#@", "Ñ@#W$9876543210?!abc;:+=-,._ "];

// console.log(body);

// - charSets
let set = 0;

// - colorful on/off
let colorful = false;

// - letters color
let charColor = "#00ff00";

// - invert on/off
let invert = false;
let invertValue = 0;

// - density
let density = 125;

// - background on/off, - background color
let bg = false;
let bgColorValue = "#000000";

let canvas;
let video;

function setup() {
  canvas = createCanvas(700, 700);
  video = createCapture(VIDEO);
  video.size(50, 50);
  video.hide();
}

function draw() {
  let inputBg = select("#background").elt;
  inputBg.onchange = function () {
    if (inputBg.checked) {
      bg = true;
    } else {
      bg = false;
    }
  };

  let inputBgColor = select("#background-color").elt;
  inputBgColor.onchange = function () {
    bgColorValue = inputBgColor.value;
  };

  if (bg) {
    clear();
    background(bgColorValue);
  } else {
    clear();
  }

  let inputColorful = select("#colorful").elt;
  inputColorful.onchange = function () {
    if (inputColorful.checked) {
      colorful = true;
    } else {
      colorful = false;
    }
  };

  let inputCharColor = select("#letters-color").elt;
  inputCharColor.onchange = function () {
    charColor = inputCharColor.value;
  };

  let inputCharA = select("#char-set-a").elt;
  let inputCharB = select("#char-set-b").elt;

  inputCharA.onchange = charSetChangeA;
  inputCharB.onchange = charSetChangeB;

  function charSetChangeA() {
    if (inputCharA.checked) {
      set = 0;
      inputCharB.checked = false;
    } else if (!inputCharA.checked) {
      set = 1;
      inputCharB.checked = true;
    }
  }

  function charSetChangeB() {
    if (inputCharB.checked) {
      set = 1;
      inputCharA.checked = false;
    } else if (!inputCharB.checked) {
      set = 0;
      inputCharA.checked = true;
    }
  }

  let inputInvert = select("#invert").elt;
  inputInvert.onchange = function () {
    if (inputInvert.checked) {
      invert = true;
    } else {
      invert = false;
    }
  };

  let inputDensity = select("#density").elt;
  inputDensity.onchange = function () {
    density = inputDensity.value;
  };

  let inputReset = select("#reset-option").elt;
  inputReset.addEventListener("click", resetValues);

  // - reset
  function resetValues() {
    bg = false;
    bgColorValue = "#000000";
    colorful = false;
    charColor = "#00ff00";
    set = 0;
    invert = false;
    invertValue = 0;
    density = 125;

    inputBg.checked = false;
    inputBgColor.value = bgColorValue;
    inputColorful.checked = false;
    inputCharColor.value = charColor;
    inputCharA.checked = true;
    inputCharB.checked = false;
    inputDensity.value = density;
    inputInvert.checked = false;
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
