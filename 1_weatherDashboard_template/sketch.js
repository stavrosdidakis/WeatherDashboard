function preload(){
}

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  fill(40);
  rect(0, 0, windowWidth/3, windowHeight);
  fill(80);
  rect(windowWidth/3, 0, windowWidth/3, windowHeight);
  fill(60);
  rect(2*windowWidth/3, 0, windowWidth/3, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
