/***********************************************************************
Project 01 - Simulation
Joseph Boumerhi

Evade the Enemy Ships
Uses WASD for movement
************************************************************************/

let enemyFleet = [];
let fleetLimit = 5;
let enemyShip = {
  x: 0,
  y: 0,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 6,
  tx: 0,
  ty: 0,
  resetsDone: 0,
};

let player = {
  x: 0,
  y: 250,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  accel: 2,
  MaxV: 14,
  friction: 0.9,
  size: 100,
};

//Allows for various states to be used, starting with title
let state = `title`;

//Background effect limit, bigger and lesser particles in BG
let numClouds = 50;

//Allows my images to be loaded in
let playerimg;
let cursorimg;
let enemyimg;

function preload() {
  playerimg = loadImage("assets/images/Ship.png");
  cursorimg = loadImage("assets/images/Usercursor.png");
  enemyimg = loadImage("assets/images/EnemyShip.png");
}

//Starts simulation
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let e = 0; e < fleetLimit; e++) {
    let enemyFleet = enemyShip(random(0, width), 0);
    enemyFleet.push(fleetLimit);
  }
  return enemyFleet;
}

//Skull and User drawn
function draw() {
  background(0, 0, 255);

  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `death`) {
    death();
  }
}

function simulation() {
  movementInput();
  charDisplay();
  createFleet();
  ai_Enemy(enemyFleet);
  enemyDisplay(enemyFleet);
  visualFX();
  enemyEffect(enemyFleet);
  enemyCrash(enemyFleet);
  borderBlock();
  mousePressed();
}

function title() {
  push();
  textSize(50);
  fill(200, 200, 100);
  textAlign(CENTER, CENTER);
  text(`Aerial-Luster`, width / 2, height / 2);
  pop();
}

function death() {
  push();
  textSize(50);
  fill(150, 150, 255);
  textAlign(CENTER, CENTER);
  text(`Defeat!`, width / 2, height / 2);
  pop();
}

function visualFX() {
  //Display visual effects (clouds)
  for (let c = 0; c < numClouds; c++) {
    let x = random(0, width);
    let y = random(0, height);
    push();
    strokeWeight(50);
    stroke(155);
    point(x, y);
    pop();
  }
}
function createFleet() {
  let enemyShip = {
    x: 0,
    y: 0,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 6,
    tx: 0,
    ty: 0,
    resetsDone: 0,
  };
  return fleet;
}

function ai_Enemy(enemyFleet) {
  //Enemy movement, slapped together the automated movement page

  //From away, the AI will approach
  // Distance between the enemy and player horizontally
  let dx = enemyShip.x - player.x;
  // Distance between the enemy and player vertically
  let dy = enemyShip.y - player.y;

  if (dx < 0) {
    // If dx is negative, the player is to the right
    // So move right
    enemyShip.vx = enemyShip.speed;
  } else if (dx > 0) {
    // If dx is positive, the player is to the left
    // So move left
    enemyShip.vx = -enemyShip.speed;
  }

  // Same again for the y axis, but it goes only down
  if (dy < 0) {
    enemyShip.vy = enemyShip.speed;
  }

  enemyShip.x = enemyShip.x + enemyShip.vx;
  enemyShip.y = enemyShip.y + enemyShip.vy;

  //Enemy reset location
  if (enemyShip.y > height) {
    enemyShip.y = 0;
    enemyShip.x = random(0, width);
  }
}

//The movement for the User, uses WASD.
function movementInput() {
  //Movement for Player
  if (keyIsDown(65)) {
    player.ax = -player.accel;
  } else if (keyIsDown(68)) {
    player.ax = player.accel;
  } else {
    player.ax = 0;
  }
  if (keyIsDown(87)) {
    player.ay = -player.accel;
  } else if (keyIsDown(83)) {
    player.ay = player.accel;
  } else {
    player.ay = 0;
  }

  //Pippin proposed the variable "friction", which allows for smooth WASD movement
  player.vx = player.vx * player.friction;
  player.vy = player.vy * player.friction;

  player.x = player.x + player.vx;
  player.y = player.y + player.vy;

  player.vx = player.ax + player.vx;
  player.vx = constrain(player.vx, -player.MaxV, player.MaxV);
  player.vy = player.ay + player.vy;
  player.vy = constrain(player.vy, -player.MaxV, player.MaxV);
}

function enemyCrash(enemyFleet) {
  //Checking for EnemyShip
  let d = dist(player.x, player.y, enemyShip.x, enemyShip.y);
  if (d < enemyShip.size / 2 + player.size / 2) {
    state = `death`;
  }
}
//For each time the enemyShip touches the bottom, it'll add to values,
//and once those values are fulfilled, add another enemy.
function enemyEffect(enemyFleet) {
  if (enemyShip.y >= height) {
    enemyShip.resetsDone++ && e;
  } else if (enemyShip.resetsDone >= 3 * e) {
    enemyShip.resetsDone = 0;
  }
}

//function enemyModifier() {

//}

function borderBlock() {
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}
//Display PNG for player, and custom cursor
function charDisplay() {
  imageMode(CENTER);
  image(playerimg, player.x, player.y);
  //imageMode(CENTER);
  //image(cursorimg,(mouseX),(mouseY + 50));
}

function enemyDisplay(enemyFleet) {
  for (let i = 0; i < fleetLimit; i++) {
    moveenemyFleet(enemyFleet[e]);
    displayenemyFleet(enemyFleet[e]);
    image(enemyimg, enemyShip.x, enemyShip.y);
  }

  function mousePressed() {
    if (state === `title`) {
      state = `simulation`;
    }
  }
  function reset() {
    if (state === `death`) {
      state = `title`;
      player.x = width / 2;
      player.y = height / 2;
      enemyShip.x = random(0, width);
      enemyShip.y = 0;
      enemyShip.resetsDone = 0;
    }
  }
}
