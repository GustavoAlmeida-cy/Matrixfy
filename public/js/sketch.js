// Char-sets
const charSets = [".:-i|=+%0#@", "Ñ@#W$9876543210?!abc;:+=-,._ "];

// Main elements
let canvas;
let content;
let video;
let img;

// Variables and default values
let mode = false;
let set = 0;
let colorful = false;
let charColor = "#00ff00";
let invert = false;
let invertValue = 0;
let density = 125;
let bgColorValue = "#000000";

// HTML elements
let inputBgColor = document.querySelector("#background-color");
let inputColorful = document.querySelector("#colorful");
let inputCharColor = document.querySelector("#letters-color");
let inputCharB = document.querySelector("#char-set-b");
let inputCharA = document.querySelector("#char-set-a");
let inputInvert = document.querySelector("#invert");
let inputDensity = document.querySelector("#density");
let inputReset = document.querySelector("#reset-option");

// HTML p5.capture
let recCounter = document.querySelector("#record-counter");

// Input interaction
inputReset.addEventListener("click", resetValues);
inputCharA.onchange = charSetChangeA;
inputCharB.onchange = charSetChangeB;

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
  // Values
  bgColorValue = "#000000";
  colorful = false;
  charColor = "#00ff00";
  set = 0;
  invert = false;
  invertValue = 0;
  density = 125;

  // Inputs
  inputBgColor.value = bgColorValue;
  inputColorful.checked = false;
  inputCharColor.value = charColor;
  inputCharA.checked = true;
  inputCharB.checked = false;
  inputDensity.value = density;
  inputInvert.checked = false;
}

// Canvas dimensions
let cW = 700;
let cH = 700;

// p5.capture options
P5Capture.setDefaultOptions({
  format: "gif",
  framerate: 20,
  width: cW,
  height: cH,
});

// p5 - function
function preload() {
  img = loadImage("./images/neo.jpg");
}

// p5 - function
function setup() {
  // Canvas
  canvas = createCanvas(cW, cH);

  // Mobile camera disable
  if (window.innerWidth >= 700) {
    // Video
    video = createCapture(VIDEO).class("cam");
    video.size(50, 50);
  }

  // Image
  content = img;
  content.resize(50, 50);

  // p5.capture button
  let p5c_btnRec = document.querySelector(".p5c-btn");

  // Record capture button
  let btnRec = document.querySelector("#btn-record");

  // Disable p5.capture GUI
  let p5c_container = document
    .querySelector(".p5c-container")
    .classList.add("hidden");

  btnRec.addEventListener("click", () => {
    p5c_btnRec.click();
  });

  // Upload input
  let inputImageUpload = createFileInput(handleFile).class("hidden");
  inputImageUpload.position(0, 0);

  // Upload button
  let btnImageUpload = select("#image-upload").elt;
  btnImageUpload.addEventListener("click", () => {
    inputImageUpload.elt.click();
  });

  // Download image button
  let btnImageDownload = select("#image-download");
  btnImageDownload.mousePressed(saveAsImage);

  // Upload function
  function handleFile(file) {
    if (file.type === "image") {
      img = loadImage(file.data);
      img.resize(50, 50);
    } else {
      img = null;
    }
  }

  // Download function
  function saveAsImage() {
    save("matrixfy.png");
  }

  // Mode button
  let btnMode = document.querySelector("#btn-mode");

  btnMode.addEventListener("click", () => {
    if (mode) {
      mode = false;
    } else if (!mode) {
      mode = true;
    }
  });
}

// p5 - function
function draw() {
  // p5.capture
  let p5c_counter = document.querySelector(".p5c-counter");
  recCounter.value = p5c_counter.innerHTML;

  // Mode verify
  if (mode) {
    content = video;
    content.size(50, 50);
  } else if (!mode) {
    content = img;
    content.resize(50, 50);
  }

  // Load content pixels
  content.loadPixels();

  // Input values change
  bgColorValue = inputBgColor.value;
  charColor = inputCharColor.value;
  density = inputDensity.value;

  if (inputColorful.checked) {
    colorful = true;
  } else {
    colorful = false;
  }

  if (inputInvert.checked) {
    invert = true;
  } else {
    invert = false;
  }

  // Dimensions
  let w = width / content.width;
  let h = height / content.height;

  // Canvas options
  clear();
  background(bgColorValue);

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
