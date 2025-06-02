let treeImg;
let tree2Img;
let treePosX, treePosY, treeScale;

function preload() {
  treeImg = loadImage("tree.png");
  tree2Img = loadImage("tree2.png");
  sqImg = loadImage("sq.png");
  maImg = loadImage("ma.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  noLoop();

  fullscreen(true);

  treePosX = width * 0.5;
  treePosY = height * 0.6;
  treeScale = 0.3;
}

function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function draw() {
  drawSkyWithGradient();
  drawSunlight();
  drawSun();

  // 이미지 나무만 출력 (나무 그림 제거됨)
  let imgW = treeImg.width * treeScale;
  let imgH = treeImg.height * treeScale;

  image(treeImg, treePosX, treePosY, imgW, imgH+ 150);
  image(treeImg, treePosX + 400, treePosY, imgW+60, imgH+150);
  image(treeImg, treePosX + 400, treePosY, imgW+60, imgH+150);
  image(treeImg, treePosX- 600 , treePosY, imgW+60, imgH+150);
 image(treeImg, treePosX- 150 , treePosY, imgW+60, imgH+150);

  image(tree2Img, treePosX - 300, treePosY, imgW, imgH+150);
  image(tree2Img, treePosX + 250, treePosY, imgW, imgH+150);
 image(tree2Img, treePosX -187, treePosY, imgW, imgH+150);
  image(tree2Img, treePosX +600, treePosY, imgW, imgH+150);
  image(tree2Img, treePosX -70, treePosY+50, imgW, imgH+50);
  image(tree2Img, treePosX +90, treePosY, imgW, imgH+50);

  image(maImg, treePosX - 400, treePosY, imgW, imgH+200);
  image(maImg, treePosX +200, treePosY, imgW, imgH+130);




  drawShrubs();
  drawFlowers();
}

function drawSkyWithGradient() {
  for (let x = 0; x < width; x++) {
    let inter = map(x, 0, width, 0, 1);
    let c = lerpColor(color(135, 206, 235), color(255, 255, 200), inter);
    stroke(c);
    line(x, 0, x, height * 0.67);
  }
  noStroke();
  fill(34, 139, 34);
  rect(0, height * 0.67, width, height * 0.33);
}

function drawSunlight() {
  noStroke();
  for (let i = width * 0.3; i > 0; i -= width * 0.01) {
    fill(255, 255, 0, 20);
    ellipse(width * 0.8, height * 0.15, i);
  }
}

function drawSun() {
  fill(255, 255, 150);
  ellipse(width * 0.8, height * 0.15, width * 0.08, height * 0.1);
}
/*
// ✅ 소나무 (stroke 색상 변경: #2C952C)
function drawPineTree(xFactor, yFactor) {
  let x = width * xFactor;
  let y = height * yFactor;

  fill(101, 67, 33);
  rect(x - width * 0.01, y, width * 0.02, height * 0.13);

  stroke('#2C952C');
  strokeWeight(3);
  fill(34, 139, 34);
  triangle(x - width * 0.04, y + height * 0.05, x + width * 0.04, y + height * 0.05, x, y - height * 0.07);
  triangle(x - width * 0.036, y - height * 0.03, x + width * 0.036, y - height * 0.03, x, y - height * 0.13);
  triangle(x - width * 0.03, y - height * 0.07, x + width * 0.03, y - height * 0.07, x, y - height * 0.16);
  noStroke();
}

// ✅ 원나무 (stroke 색상 변경: #6DD66D)
function drawRoundTree(xFactor, yFactor) {
  let x = width * xFactor;
  let y = height * yFactor;

  fill(101, 67, 33);
  rect(x - width * 0.01, y, width * 0.02, height * 0.13);

  stroke('#6DD66D');
  strokeWeight(3);
  fill(50, 180, 50);
  ellipse(x, y - height * 0.07, width * 0.15, height * 0.22);
  noStroke();
}
*/
function drawClover(xFactor, yFactor) {
  let x = width * xFactor;
  let y = height * yFactor;

  fill(0, 150, 0);
  ellipse(x - 5, y - 5, 10, 10);
  ellipse(x + 5, y - 5, 10, 10);
  ellipse(x, y + 5, 10, 10);
  rect(x - 1, y + 5, 2, 10);
}

function drawDandelion(xFactor, yFactor) {
  let x = width * xFactor;
  let y = height * yFactor;

  fill(255, 215, 0);
  ellipse(x, y, 15, 15);
  fill(0, 128, 0);
  rect(x - 1, y, 2, 15);
}

// ✅ drawTrees 제거됨

function drawShrubs() {
  drawClover(0.15, 0.75);
  drawClover(0.16, 0.76);
  drawClover(0.17, 0.77);
  drawClover(0.6, 0.78);
}

function drawFlowers() {
  drawDandelion(0.25, 0.78);
  drawDandelion(0.26, 0.79);
  drawDandelion(0.27, 0.80);
  drawDandelion(0.53, 0.80);
  drawDandelion(0.7, 0.83);
}