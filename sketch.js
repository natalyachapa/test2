let puff; //font
let sound; //glass break sound
let music; // music
let play = false;
function preload() {
  sound = loadSound("vase.wav");
  music = loadSound("music.mp3");
  puff = loadFont("puff.ttf");
}
let armLength = 38;
let armSpeed = 0.5;
let bowlX = 300;
let bowlY = 280;
let bowlSpeed = 0.5;
let bowlFall = false;
let fallSpeed = 4;
let tableEndX = 550;
let dark = true;
let lightSwitch = 0;
let gameOver = false;
let gameWin = false;
let timer = 45;
let endTimer = 0;

function setup() {
  createCanvas(700, 400);
  music.play();
  music.setVolume(0.5);
  music.loop();
}

function restart() {
  // reset positions
  bowlX = 300;
  bowlY = 280;
  armLength = 38;
  // reset bowl
  bowlFall = false;
  play = false;
  // reset game state
  gameOver = false;
  gameWin = false;
  // reset timer
  timer = 45;
  endTimer = millis();
  // reset lighting if needed
  dark = true;
}

function draw() {
  background(108, 112, 166);
  strokeWeight(0);

  //draw fish bowl
  fill(127, 177, 206);
  ellipseMode(CENTER);
  ellipse(bowlX, bowlY, 60, 60); //fish bowl
  triangle(bowlX, bowlY, bowlX - 28, bowlY - 41, bowlX + 28, bowlY - 41); //fish bowl

  //draw fish
  fill(255, 150, 0);
  ellipse(bowlX, bowlY, 23, 15); //fish body
  triangle(bowlX, bowlY, bowlX + 17, bowlY - 10, bowlX + 17, bowlY + 10); //fish tail

  //draw table
  fill(200, 183, 147);
  rect(0, 300, 550, 40); //table top
  rect(420, 340, 40, 170); //table leg

  //draw cat
  ellipseMode(CENTER);
  fill(0);
  textSize(15);
  ellipse(200, 200, 80, 80); //head
  ellipse(200, 250, 70, 100); //front of body
  ellipse(180, 265, 80, 90); //back of body
  triangle(162, 186, 183, 172, 166, 155); //left ear
  triangle(206, 166, 233, 180, 216, 145); //right ear
  fill(240, 226, 240);
  triangle(202, 210, 210, 209, 206, 206); //nose
  rect(205.5, 209, 1, 8); //mouth
  fill(242, 204, 101);
  ellipse(190, 198, 20, 25); //left eye yellow
  ellipse(220, 195, 16, 25); //right eye yellow
  fill(0);
  ellipse(187, 198, 10, 15); //left eye black
  ellipse(217, 195, 8, 13); //right eye black
  rect(100, 295, 80, 15); //tail
  ellipse(100, 302, 15, 15); //tail end

  //draw arm
  rect(230, 247, armLength, 15); //arm
  ellipse(230 + armLength, 247, 15, 15); //paw top
  ellipse(230 + armLength, 260, 15, 15); //paw bottom
  ellipse(235 + armLength, 253, 15, 15); //paw middle
  fill(240, 226, 240);
  ellipse(230 + armLength, 247, 5, 5); //paw pad top
  ellipse(230 + armLength, 260, 5, 5); //paw pad bottom
  ellipse(235 + armLength, 253, 5, 5); //paw pad middle

  //draw button
  fill(128, 172, 198);
  ellipse(524, 110, 100, 100);
  fill(240, 222, 242);
  ellipse(524, 120, 30, 30);
  ellipse(524, 131, 30, 30);
  ellipse(510, 135, 30, 30);
  ellipse(538, 135, 30, 30);
  ellipse(510, 85, 20, 28);
  ellipse(538, 85, 20, 28);
  ellipse(490, 108, 20, 28);
  ellipse(558, 108, 20, 28);
  textFont(puff);
  textSize(15);
  textAlign(CENTER);
  fill(128, 172, 198);
  text("click", 524, 137);

  //draw Light
  fill(63, 63, 63);
  rect(340, 50, 20, 20);
  ellipse(350, 48, 5, 10);
  ellipse(350, 38, 5, 10);
  ellipse(350, 28, 5, 10);
  ellipse(350, 18, 5, 10);
  ellipse(350, 8, 5, 10);
  fill(248, 255, 158);
  ellipse(350, 85, 20, 24);
  rect(345, 70, 10, 15);

  //instructions
  fill(128, 172, 198);
  rect(545, 5, 138, 30);
  textSize(20);
  fill(240, 222, 242);
  text("instructions", 605, 28, 20);

  if (mouseX > 530 && mouseX < 667 && mouseY < 35 && mouseY > 7) {
    fill(240, 222, 242);
    rect(100, 50, 500, 300);
    fill(128, 172, 198);
    textSize(30);
    text("Push the fishbowl off the table,", width / 2, 150);
    text("but only when its dark!", width / 2, 200);
    text("hurry before the time runs out!", width / 2, 250);
  }
  //extend arm
  if (
    mouseIsPressed &&
    mouseX > 474 &&
    mouseX < 530 &&
    mouseY < 161 &&
    mouseY > 62
  ) {
    armLength += armSpeed;
  }
  //push bowl
  if (
    mouseIsPressed &&
    mouseX > 474 &&
    mouseX < 575 &&
    mouseY < 161 &&
    mouseY > 62
  ) {
    bowlX += bowlSpeed; // push the bowl
  }
  //timer
  if (timer <= 60) {
    textFont(puff);
    fill(240, 222, 242);
    textSize(50);
    textAlign(CENTER);
    text(timer, 50, 50);
  }

  //game win
  if (bowlY > 450) {
    gameWin = true;
  }
  if (gameWin === true) {
    dark = false;
    fill(108, 112, 166);
    rect(0, 0, width, height);
    fill(128, 172, 198);
    fill(108, 112, 166);
    rect(0, 0, width, height);
    fill(240, 222, 242);
    textFont(puff);
    textSize(100);
    textAlign(CENTER);
    text("win", width / 2, height / 2);
  }
  //game lose
  if (mouseIsPressed && !dark) {
    gameOver = true;
  }
  if (timer <= 0) {
    gameOver = true;
  }
  if (gameOver) {
    dark = false;
    fill(108, 112, 166);
    rect(0, 0, width, height);
    fill(128, 172, 198);
    rect(290, height / 2 + 37, 120, 35);
    fill(240, 222, 242);
    textFont(puff);
    textSize(100);
    textAlign(CENTER);
    text("lose", width / 2, height / 2);
    textSize(30);
    text("restart", width / 2, height / 2 + 65);

    if (
      mouseIsPressed &&
      mouseX > 290 &&
      mouseX < 409 &&
      mouseY < 275 &&
      mouseY > 238
    )
      restart();
  }

  //Light logic
  if (dark) {
    fill(0, 0, 0, 220);
  } else {
    fill(0, 0, 0, 0);
  }
  rect(0, 0, width, height);

  if (millis() > lightSwitch) {
    if (dark) {
      dark = false;
    } else {
      dark = true;
    }
    lightSwitch = millis() + random(1000, 3000);
  }

  //bowl falling
  if (bowlX > tableEndX + 10) bowlFall = true;

  if (bowlFall) bowlY += fallSpeed;

  //bowl break sound
  if (bowlY > 430 && play == false) {
    sound.setVolume(0.2);
    sound.play();
    play = true;
  }
  if (millis() > endTimer + 1000) {
    timer = timer - 1;
    endTimer = millis();
  }

  textSize(20);
  fill(0);
  //text(`x: ${mouseX} y: ${mouseY}`, 100, 330);
}
