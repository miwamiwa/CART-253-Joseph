/***********************************************************
Activity 5 - Looking For Love
Joseph Boumerhi

Simulates a "Cop and Robber" encounter, used A5 as template
***********************************************************/
let police = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  accel: 0.45,
  MaxV: 5,
  speed: 5
};

let robber = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  accel: 0.45,
  MaxV: 5,
  speed: 5,
  friction: 0.89
};

let secret = {
  x: 0,
  y: 500,
  size: 10,
  fill: 0
};

//Could be title, simulation, and the endings (good and bad)
//Remember to set it as the first state of the program as a title or menu
let state = `title`;

//Setups
function setup() {
createCanvas(1000,600);
setupCircles();
}

//Setups police, robber at center
function setupCircles() {
police.x = width/3;
robber.x = 2 * width/3;

}

//Calls the simulation in draw(), and the various states (start, end)
function draw() {
  background(0);

if (state === `title`) {
  title();
}
else if (state === `simulation`) {
  simulation();
}
else if (state === `capture`) {
  capture();
}
else if (state === `escape`) {
  escape();
}
else if (state === `secret`) {
  secret_text();
  }
}


function title () {
  push();
  textSize(50);
  fill(200,200,100);
  textAlign(CENTER,CENTER);
  text(`Cops and Robbers`, width/2, height/2);
  pop();
}

//Simulation is called, drawn and manages other functions
function simulation () {
  movementInput();
  fearOfArrest();
  aiPolice();
  checkOffScreen();
  overlap();
  display();
  specialCondition();

}

function capture() {
  push();
  textSize(50);
  fill(150,150,255);
  textAlign(CENTER,CENTER);
  text(`Caught the Robber!`, width/2, height/2);
  pop();
}

function escape() {
  push();
  textSize(50);
  fill(255,150,150);
  textAlign(CENTER,CENTER);
  text(`Robber has escaped!`, width/2, height/2);
  pop();
}

function secret_text() {
  push();
  textSize(45);
  fill(255,150,150);
  textAlign(CENTER,CENTER);
  text(`Huh? You found something shiny!`, width/2, height/2);
  pop();
}

function aiPolice() {

  let change = random();
  if (change < 0.1) {
    police.vx = random(-police.speed,police.speed);
    police.vy = random(-police.speed,police.speed);
  }

  police.x = police.x + police.vx;
  police.y = police.y + police.vy;

  police.vx = police.ax + police.vx;
  police.vx = constrain(police.vx,-police.MaxV,police.MaxV);
  police.vy = police.ay + police.vy;
  police.vy = constrain(police.vy,-police.MaxV,police.MaxV);
}

//The movement for the player Robber, uses WASD.
function movementInput() {

//Movement for Robber
if (keyIsDown(65)) {
  robber.ax = -robber.accel;
}
else if (keyIsDown(68)) {
  robber.ax = robber.accel;
}
else {
  robber.ax = 0;
}
if (keyIsDown(87)) {
  robber.ay = -robber.accel;
}
else if (keyIsDown(83)) {
  robber.ay = robber.accel;
}
else {
  robber.ay = 0;
}

//Pippin proposed the variable "friction", which allows for smooth WASD movement
robber.vx = robber.vx * robber.friction;
robber.vy = robber.vy * robber.friction;

robber.x = robber.x + robber.vx;
robber.y = robber.y + robber.vy;

robber.vx = robber.ax + robber.vx;
robber.vx = constrain(robber.vx,-robber.MaxV,robber.MaxV);
robber.vy = robber.ay + robber.vy;
robber.vy = constrain(robber.vy,-robber.MaxV,robber.MaxV);
}

//Penalizes the robber' speed for being near the police
function fearOfArrest() {
let fearProx = int(dist(police.x, police.y, robber.x, robber.y));
let fearMap = map(fearProx, police.x, 200, police.y, 1000);
fearMap = constrain(fearMap,0, 1000);
if (fearMap > 500) {
  robber.friction = 0.45;
}
else if (fearMap < 500){
  robber.friction = 0.89;
  }
}

//Check whether either circle is off-screen
function checkOffScreen() {
if (isOffScreen(robber)) {
  state = `escape`;
  }
}

function isOffScreen(robber) {
  if (robber.x < 0 || robber.x > width || robber.y < 0 || robber.y > height) {
    return true;
  }
    else {
    return false;
  }
}

//Check if circles end up overlapping
function overlap() {
  let d = dist(police.x, police.y, robber.x, robber.y);
  if (d < police.size/2 + robber.size/2) {
      state = `capture`;
  }
}

//Shows visuals for player units
function display() {

//Cop
fill(0,0,255);
ellipse(police.x, police.y, police.size);

//Robber
fill(255,0,0);
ellipse(robber.x, robber.y, robber.size);
}

//Changes the title state to the simulation state
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}

function specialCondition() {
  let scrt = dist(robber.x, robber.y, secret.x, secret.y);
  fill(secret.fill);
  square(secret.x,secret.y,secret.size,alpha(0));
  if (scrt < robber.size/2 + secret.size/2) {
      state = `secret`;
  }
}
