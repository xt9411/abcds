// 定義兩組精靈圖結構
let sprites1 = {
  idle: {
    img: null,
    width: 731/8,
    height: 70,
    frames: 4
  },
  walk: {
    img: null,
    width: 366/7,
    height: 60,
    frames: 6
  },
  jump: {
    img: null,
    width: 705/10,
    height: 63,
    frames: 4
  }
};

let sprites2 = {
  idle: {
    img: null,
    width: 585/10,
    height: 61,
    frames: 4
  },
  walk: {
    img: null,
    width: 965/10,
    height: 68,
    frames: 6
  },
  jump: {
    img: null,
    width: 239/4,
    height: 64,
    frames: 4
  }
};

// 兩個角色的狀態
let character1 = {
  x: 200,
  y: 200,
  currentFrame: 0,
  currentAction: 'idle'
};

let character2 = {
  x: 400,
  y: 200,
  currentFrame: 0,
  currentAction: 'idle'
};

function preload() {
  // 確保所有圖片都正確載入
  sprites1.idle.img = loadImage('1/idle-sprite.png');
  sprites1.walk.img = loadImage('2/walk-sprite.png');
  sprites1.jump.img = loadImage('3/jump-sprite.png');
  
  sprites2.idle.img = loadImage('21/idle-sprite.png');
  sprites2.walk.img = loadImage('22/walk-sprite.png');
  sprites2.jump.img = loadImage('23/jump-sprite.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
  
  // 設定初始位置
  character1.x = width/3;
  character1.y = height/2;
  character2.x = 2 * width/3;
  character2.y = height/2;
}

function draw() {
  background(220);
  
  // 繪製第一個角色
  drawCharacter(character1, sprites1);
  
  // 繪製第二個角色
  drawCharacter(character2, sprites2);
  
  // 處理輸入
  handleInput();
}

function drawCharacter(char, spriteSet) {
  let currentSprite = spriteSet[char.currentAction];
  
  // 確保圖片已載入且有效
  if (!currentSprite || !currentSprite.img) {
    console.error('Sprite not loaded:', char.currentAction);
    return;
  }
  
  // 確保 currentFrame 在有效範圍內
  char.currentFrame = char.currentFrame % currentSprite.frames;
  
  if (frameCount % 6 == 0) {
    char.currentFrame = (char.currentFrame + 1) % currentSprite.frames;
  }
  
  let sx = Math.floor(char.currentFrame) * currentSprite.width;
  
  push();
  imageMode(CENTER);
  
  // 添加錯誤處理
  try {
    image(currentSprite.img, 
      char.x, char.y,           
      currentSprite.width*2, currentSprite.height*2,   
      sx, 0,                             
      currentSprite.width, currentSprite.height    
    );
  } catch (e) {
    console.error('Error drawing character:', e);
  }
  
  pop();
}

function handleInput() {
  // 第一個角色控制 (方向鍵)
  let char1Moving = false;
  let prevAction1 = character1.currentAction; // 保存前一個動作
  
  if (keyIsDown(LEFT_ARROW)) {
    character1.x -= 5;
    char1Moving = true;
    character1.currentAction = 'walk';
  } else if (keyIsDown(RIGHT_ARROW)) {
    character1.x += 5;
    char1Moving = true;
    character1.currentAction = 'walk';
  }
  
  if (keyIsDown(UP_ARROW)) {
    character1.currentAction = 'jump';
  } else if (!char1Moving) {
    character1.currentAction = 'idle';
  }
  
  // 如果動作改變，重置幀計數
  if (prevAction1 !== character1.currentAction) {
    character1.currentFrame = 0;
  }
  
  // 第二個角色控制 (WASD)
  let char2Moving = false;
  let prevAction2 = character2.currentAction; // 保存前一個動作
  
  if (keyIsDown(65)) { // A鍵
    character2.x -= 5;
    char2Moving = true;
    character2.currentAction = 'walk';
  } else if (keyIsDown(68)) { // D鍵
    character2.x += 5;
    char2Moving = true;
    character2.currentAction = 'walk';
  }
  
  if (keyIsDown(87)) { // W鍵
    character2.currentAction = 'jump';
  } else if (!char2Moving) {
    character2.currentAction = 'idle';
  }
  
  // 如果動作改變，重置幀計數
  if (prevAction2 !== character2.currentAction) {
    character2.currentFrame = 0;
  }
  
  // 邊界檢查
  character1.x = constrain(character1.x, sprites1[character1.currentAction].width, width - sprites1[character1.currentAction].width);
  character2.x = constrain(character2.x, sprites2[character2.currentAction].width, width - sprites2[character2.currentAction].width);
}
// 在全域變數區域加入
let bgImage;

// 在 preload() 函數中加入
function preload() {
  // 載入背景圖片
  bgImage = loadImage('background.png');
  
  // 原有的精靈圖載入
  sprites1.idle.img = loadImage('1/idle-sprite.png');
  sprites2.idle.img = loadImage('21/idle-sprite.png');
  
  // ... 其他圖片載入 ...
}

// 修改 draw() 函數的開頭部分
function draw() {
  // 取代原本的 background(220)
  // 方法1：簡單填滿
  image(bgImage, 0, 0, width, height);
  
  // 或者方法2：視差滾動效果
  // let bgX = map(character1.x, 0, width, 0, width/4);
  // image(bgImage, -bgX, 0, width*1.25, height);
  
  // 繼續原本的程式碼
  drawCharacter(character1, sprites1);
  drawCharacter(character2, sprites2);
  handleInput();
}