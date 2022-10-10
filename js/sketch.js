let img;

function preload() {
  img = loadImage("../images/arch.png");
}

function setup() {
  createCanvas(500, 500);
  //   img.resize(50, 50);
  image(img, 0, 0, width, height);
}

function draw() {}
