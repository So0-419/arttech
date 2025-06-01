
function preload() {
  
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
  
}

function draw() {
 
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


// ✅ drawTrees 제거됨

