// 장면 1, 장면 2 전역변수
let video, facemesh, predictions = [];
let mouthOpen = false, mouthOpenStart = 0;
let THRESHOLD = 15;      // 입 벌어진 정도 기준값(실험하면서 조절)
let smokeCount = 0, scene = 1;

let imgCiga1, imgCiga2, imgCiga3, imgCigaTrash, cigaImg;
let defaultTownImg, clickAllImg, clickMountainImg, clickSwarImg;
let modeMountain = false, modeSwar = false;

// === 산/하수구 클릭 영역 (수정하세요!) ===
let mountainArea = { x: 0, y: 80, w: 700, h: 200 };  // 산 영역 좌표
let sewerArea    = { x: 850, y: 610, w: 200, h: 100 };  // 하수구 영역 좌표



function preload() {
  imgCiga1  = loadImage('ciga1.png');
  imgCiga2  = loadImage('ciga2.png');
  imgCiga3  = loadImage('ciga3.png');
  imgCigaTrash = loadImage('cigaTrash.png');
  defaultTownImg   = loadImage('defaultTown.png');
  clickAllImg      = loadImage('ClickAll.png');
  clickMountainImg = loadImage('clickMountain.png');
  clickSwarImg     = loadImage('clickSwar.png');

} 

function setup() {
  
  fullscreen(true);
  createCanvas(windowWidth, windowHeight);
  // 웹캠 세팅
  video = createCapture(VIDEO);
  video.size(400, 300);
  video.hide();

  // FaceMesh 모델 로드
  facemesh = ml5.facemesh(video, () => console.log('Facemesh loaded'));
  facemesh.on('predict', results => predictions = results);

  // 초기 시가 이미지
  cigaImg = imgCiga3;

  imageMode(CENTER);

  treePosX = width * 0.5;
  treePosY = height * 0.6;
  treeScale = 0.3;

  startTime = millis(); // 시작 시간 저장
}

function draw() {
  clear();
  if (scene === 1) {
    drawScene1();
  } 
  else{
    drawScene2();
  } 
  
}

function drawScene1() {
  background(255);
  // 가운데에 시가 이미지
  imageMode(CENTER);
  image(cigaImg,
        width/2,height/2,cigaImg.width/2,
        cigaImg.height/2);
  // 왼쪽 위에 웹캠 영상
  imageMode(CORNER);
  image(video, 0, 0);

  handleMouthOpen();
}

function handleMouthOpen() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    // 입술 위아래 포인트 (13,14) 사용
    const topLip    = keypoints[13];
    const bottomLip = keypoints[14];
    const d = dist(topLip[0], topLip[1], bottomLip[0], bottomLip[1]);

    if (d > THRESHOLD) {
      // 입 벌림 시작 시각 기록
      if (!mouthOpen) {
        mouthOpen = true;
        mouthOpenStart = millis();
      } else {
        // 2초 유지되면 흡연 카운트 올리기
        if (millis() - mouthOpenStart > 2000) {
          mouthOpen = false;
          incrementSmoke();
        }
      }
    } else {
      mouthOpen = false;
    }
  }
}

function incrementSmoke() {
  smokeCount++;
  if      (smokeCount === 1) cigaImg = imgCiga2;
  else if (smokeCount === 2) cigaImg = imgCiga1;
  else if (smokeCount === 3) {
    cigaImg = imgCigaTrash;
    // 5초 뒤 장면 2로 전환
    setTimeout(() => scene = 2, 5000);
  }
}

function drawScene2() {
  

  // 1) 둘 다 true → clickAll
  if (modeMountain && modeSwar) {
    image(clickAllImg, 0, 0, width, height);

  // 2) swar만 true → clickSwar / over 산 → clickAll
  } else if (modeSwar && !modeMountain) {
    if (isOver(mountainArea)) image(clickAllImg, 0, 0, width, height);
    else                      image(clickSwarImg, 0, 0, width, height);

  // 3) mountain만 true → clickMountain / over 하수구 → clickAll
  } else if (!modeSwar && modeMountain) {
    if (isOver(sewerArea)) image(clickAllImg, 0, 0, width, height);
    else                   image(clickMountainImg, 0, 0, width, height);

  // 0) 둘 다 false → default / over 산 → clickMountain / over 하수구 → clickSwar
  } else {
    if      (isOver(mountainArea)) image(clickMountainImg, 0, 0, width, height);
    else if (isOver(sewerArea))    image(clickSwarImg,      0, 0, width, height);
    else                            image(defaultTownImg,   0, 0, width, height);
  }

  fill(0);
  noStroke();
  textSize(16);
  text(`mouse: ${mouseX}, ${mouseY}`, 10, 20);
}

function isOver(area) {
  return mouseX > area.x &&
         mouseX < area.x + area.w &&
         mouseY > area.y &&
         mouseY < area.y + area.h;
}

function mousePressed() {
  if (scene !== 2) return;

  // 0) 둘 다 false 상태에서
  if (!modeMountain && !modeSwar) {
    if (isOver(mountainArea)) clickMountain();
    else if (isOver(sewerArea)) clickSwar();

  // 2) swar만 true 상태에서
  } else if (modeSwar && !modeMountain) {
    if (isOver(mountainArea)) clickMountain();

  // 3) mountain만 true 상태에서
  } else if (!modeSwar && modeMountain) {
    if (isOver(sewerArea)) clickSwar();
  }

  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function clickMountain() {
  modeMountain = true;
  // 이후 다른 장면 전환 로직은 여기서 추가
}

function clickSwar() {
  modeSwar = true;
  // 이후 다른 장면 전환 로직은 여기서 추가
}
