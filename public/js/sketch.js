// Char-sets
const charSets = [".:-i|=+%0#@", "Ñ@#W$9876543210?!abc;:+=-,._ "];

// Variables and default values
let set = 0;
let colorful = false;
let charColor = "#00ff00";
let invert = false;
let invertValue = 0;
let density = 125;
let bgColorValue = "#000000";

// Main elements
let canvas;
let video;

// Canvas dimensions
let cW = window.innerWidth;
let cH = window.innerHeight;

// Canvas dimensions check
if (cW >= 700) {
  cW = 700;
} else {
  cW = window.innerWidth;
}

if (cH >= 700) {
  cH = 700;
} else {
  cH = window.innerHeight;
}

// p5.capture options
P5Capture.setDefaultOptions({
  format: "gif",
  framerate: 20,
  width: cW,
  height: cH,
});

function setup() {
  // Canvas
  canvas = createCanvas(cW, cH);
  // Video capture
  video = createCapture(VIDEO);

  console.log(video.size());

  alert(video.size().width);

  alert(video.size().height);

  video.size(50, 50);
  console.log(video.size());
  video.hide();

  // p5.capture and HTML button interaction
  let btnRec = document.querySelector("#btn-record");
  let p5c_btnRec = document.querySelector(".p5c-btn");

  btnRec.addEventListener("click", () => {
    p5c_btnRec.click();
  });

  let p5c_container = document.querySelector(".p5c-container");
  p5c_container.classList.add("hidden");

  // Download image button
  let btnImage = select("#image-download");

  function saveAsImage() {
    save("myImage.png");
  }

  btnImage.mousePressed(saveAsImage);
}

function draw() {
  // HTML elements - option inputs
  let inputBgColor = select("#background-color").elt;
  let inputColorful = select("#colorful").elt;
  let inputCharColor = select("#letters-color").elt;
  let inputCharB = select("#char-set-b").elt;
  let inputCharA = select("#char-set-a").elt;
  let inputInvert = select("#invert").elt;
  let inputDensity = select("#density").elt;
  let inputReset = select("#reset-option").elt;

  // p5.capture HTML elements
  let recCounter = document.querySelector("#record-counter");
  let p5c_counter = document.querySelector(".p5c-counter");

  recCounter.value = p5c_counter.innerHTML;

  // Input interactions
  inputBgColor.onchange = function () {
    bgColorValue = inputBgColor.value;
  };

  inputColorful.onchange = function () {
    if (inputColorful.checked) {
      colorful = true;
    } else {
      colorful = false;
    }
  };

  inputCharColor.onchange = function () {
    charColor = inputCharColor.value;
  };

  inputInvert.onchange = function () {
    if (inputInvert.checked) {
      invert = true;
    } else {
      invert = false;
    }
  };

  inputDensity.onchange = function () {
    density = inputDensity.value;
  };

  inputCharA.onchange = charSetChangeA;
  inputCharB.onchange = charSetChangeB;

  inputReset.addEventListener("click", resetValues);

  // Input functions
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

  function resetValues() {
    bgColorValue = "#000000";
    colorful = false;
    charColor = "#00ff00";
    set = 0;
    invert = false;
    invertValue = 0;
    density = 125;

    inputBgColor.value = bgColorValue;
    inputColorful.checked = false;
    inputCharColor.value = charColor;
    inputCharA.checked = true;
    inputCharB.checked = false;
    inputDensity.value = density;
    inputInvert.checked = false;
  }

  clear();
  background(bgColorValue);

  // Load Pixels
  video.loadPixels();

  // Dimensions
  let w = width / video.width;
  let h = height / video.height;

  // Get pixels index
  for (let j = 0; j < video.height; j++) {
    // Column
    for (let i = 0; i < video.width; i++) {
      // Row

      // Pixel index
      const pixelIndex = (i + j * video.width) * 4;

      // Colors
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];

      // Gray scale
      const avg = (r + g + b) / 3;

      // Color mode
      if (colorful) {
        fill(r, g, b);
      } else {
        fill(charColor);
      }

      // Text options
      textSize(w);
      textAlign(CENTER, CENTER);

      // Char-set length
      let len = charSets[set].length;

      // Brightness mode
      if (invert) {
        invertValue = len;
        len = 0;
      } else {
        invertValue = 0;
        len = charSets[set].length;
      }

      // Map brightness with a character index
      const charIndex = floor(map(avg, 0, density, len, invertValue));

      // Draw
      text(charSets[set].charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
    }
  }
}
