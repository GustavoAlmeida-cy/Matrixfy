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
let mode = false;
let canvas;
let content;
let video;
let img;

// Canvas dimensions
let cW = window.innerWidth;
let cH = window.innerHeight;

cW = 700;
cH = 700;

// p5.capture options
P5Capture.setDefaultOptions({
  format: "gif",
  framerate: 20,
  width: cW,
  height: cH,
});

function preload() {
  img = loadImage("./images/neo.jpg");
}

function setup() {
  // Canvas
  canvas = createCanvas(cW, cH);

  video = createCapture(VIDEO).class("cam");
  video.size(50, 50);

  content = img;
  content.resize(50, 50);

  // p5.capture and HTML button interaction
  let btnRec = document.querySelector("#btn-record");
  let p5c_btnRec = document.querySelector(".p5c-btn");

  btnRec.addEventListener("click", () => {
    p5c_btnRec.click();
  });

  let p5c_container = document.querySelector(".p5c-container");
  p5c_container.classList.add("hidden");

  // ----

  let inputImageUpload;
  inputImageUpload = createFileInput(handleFile).class("hidden");
  inputImageUpload.position(0, 0);

  let btnImageUpload;
  btnImageUpload = select("#image-upload").elt;
  btnImageUpload.addEventListener("click", () => {
    inputImageUpload.elt.click();
  });

  function handleFile(file) {
    if (file.type === "image") {
      img = loadImage(file.data);
      img.resize(50, 50);
    } else {
      img = null;
    }
  }

  // Download image button
  let btnImageDownload = select("#image-download");

  function saveAsImage() {
    save("myImage.png");
  }

  btnImageDownload.mousePressed(saveAsImage);
}

function draw() {
  console.log(mode);

  // let inputImageUpload = select("#input-upload");

  // ----
  let btnMode = document.querySelector("#btn-mode");

  btnMode.addEventListener("click", () => {
    console.log("SS");

    if (mode) {
      mode = false;
    } else if (!mode) {
      mode = true;
    }
  });

  if (mode) {
    // Video capture
    content = video;
    content.size(50, 50);
    // content.hide();
  } else {
    content = img;
    content.resize(50, 50);
  }

  if (!mode) {
    content.resize(50, 50);
  }

  content.loadPixels();

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
  // if (mode) {
  // }

  // Dimensions
  let w = width / content.width;
  let h = height / content.height;

  // Get pixels index
  for (let j = 0; j < content.height; j++) {
    // Column
    for (let i = 0; i < content.width; i++) {
      // Row

      // Pixel index
      const pixelIndex = (i + j * content.width) * 4;

      // Colors
      const r = content.pixels[pixelIndex + 0];
      const g = content.pixels[pixelIndex + 1];
      const b = content.pixels[pixelIndex + 2];

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
