let handpose;

let cigarette;
let cigaretteX, cigaretteY;
let hasDroppedOnce = false;  // ✅ 한 번만 떨어뜨리기
const cigaretteSize = 150;

function preload() {
  cigarette = loadImage('cig.png');
}

function setup() {
  createCanvas(640, 480);
  cigaretteX = width / 2;
  cigaretteY = height / 2;
  setupVideoAndModel();
}

function draw() {
  background(220);
  drawVideo();
  handleHandDetection();
  displayCigarette();
}

// 📦 웹캠과 모델 설정
function setupVideoAndModel() {
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, () => {
    console.log("Handpose model loaded!");
  });

  handpose.on("predict", results => {
    predictions = results;
  });
}

// 📦 비디오 출력
function drawVideo() {
  image(video, 0, 0, width, height);
}

// 📦 손 인식 및 담배 상태 변경
function handleHandDetection() {
  if (predictions.length > 0 && !hasDroppedOnce) {
    const hand = predictions[0];
    const fingers = hand.annotations;

    if (areAllFingersExtended(fingers)) {
      // ✅ 손가락이 모두 펴졌고 아직 떨어진 적 없을 때
      cigaretteY = height - cigaretteSize / 2;
      hasDroppedOnce = true;
    }
  }
}

// 📦 손가락이 모두 펴졌는지 판별
function areAllFingersExtended(fingers) {
  const fingerNames = ['indexFinger', 'middleFinger', 'ringFinger', 'pinky'];
  for (const name of fingerNames) {
    const tip = fingers[name][3];
    const base = fingers[name][0];
    if (tip[1] > base[1]) return false;
  }
  return true;
}

// 📦 담배 이미지 출력
function displayCigarette() {
  image(cigarette, cigaretteX - cigaretteSize / 2, cigaretteY - cigaretteSize / 2, cigaretteSize, cigaretteSize);
}