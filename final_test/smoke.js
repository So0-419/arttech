let cigaretteImg;
let cigarettes = [];
let spawnInterval = 120;
let lastSpawnFrame = 0;

function preload() {
  cigaretteImg = loadImage("담배꽁초.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  setupFloatingCigarettes(); // 초기 설정 함수 호출
}

function draw() {
  clear(); // 배경은 따로 있다고 가정
  updateFloatingCigarettes(); // 담배꽁초 애니메이션 업데이트
}

// ✅ 1. 초기 설정 함수
function setupFloatingCigarettes() {
  cigarettes = [];
  lastSpawnFrame = frameCount;
  cigarettes.push(createCigarette());
}

// ✅ 2. 매 프레임 업데이트 함수
function updateFloatingCigarettes() {
  // 일정 간격마다 새 담배꽁초 생성
  if (frameCount - lastSpawnFrame > spawnInterval) {
    cigarettes.push(createCigarette());
    lastSpawnFrame = frameCount;
  }

  // 담배꽁초 각각 업데이트 + 그리기
  for (let cig of cigarettes) {
    cig.x += cig.speed;
    cig.y += sin(frameCount * cig.waveOffset) * 0.4;
    cig.angle += cig.angleSpeed;

    push();
    translate(cig.x, cig.y);
    rotate(cig.angle);
    image(cigaretteImg, 0, 0, 100, 50);
    pop();
  }
}

// ✅ 3. 담배꽁초 하나 생성
function createCigarette() {
  return {
    x: -100,
    y: height / 2 + random(-50, 50),
    speed: random(1.2, 2),
    angle: random(-0.1, 0.1),
    angleSpeed: random(-0.005, 0.005),
    waveOffset: random(0.02, 0.05)
  };
}
