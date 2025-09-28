// fruit container to randomize image
let randomFruit = [];

//fruit container to randomize position
let fruitPos = [];

// fruit to click
let rightFruit;

// fruit name list
let fruitName = [
  "apple",
  "banana",
  "blueberry",
  "cherry",
  "coconut",
  "kiwi",
  "lemon",
  "orange",
  "peach",
  "pear",
  "pomegranate",
  "strawberry",
];

// fruit png string list
let fruits = [
  "fruits/apple.png",
  "fruits/banana.png",
  "fruits/blueberry.png",
  "fruits/cherry.png",
  "fruits/coconut.png",
  "fruits/kiwi.png",
  "fruits/lemon.png",
  "fruits/orange.png",
  "fruits/peach.png",
  "fruits/pear.png",
  "fruits/pomegranate.png",
  "fruits/strawberry.png",
];

// more png text string lists
let blenders = [
  "blender/blender00.png",
  "blender/blender01.png",
  "blender/blender02.png",
  "blender/blender03.png",
  "blender/blender04.png",
  "blender/blender05.png",
  "blender/blender06.png",
  "blender/blender07.png",
  "blender/blender08.png",
  "blender/blender09.png",
  "blender/blender10.png",
];

let smoothies = [
  "background/glass1.png",
  "background/glass2.png",
  "background/glass3.png",
  "background/mug1.png",
  "background/mug2.png",
  "background/mug3.png",
  "background/wine1.png",
  "background/wine2.png",
  "background/wine3.png",
];

let tables = [
  "background/table1.png",
  "background/table2.png",
  "background/table3.png",
];

let lights = [
  "background/lights1.png",
  "background/lights2.png",
  "background/lights3.png",
];

// random text strings list
let compliment = ["Amazing work!", "Fantastic job!", "Well done!"];
let adjective = ["delectable", "scrumptuous", "succulent"];
let noun = ["Connoisseur", "Guru", "Genius"];
let textBubble;

//png arrays
let light = [];
let table = [];
let smoothie = [];
let blender = [];
let blenderNum;

let pixelFont;

let score = 0;

let totalTime;

let cursor;

let grabSound, blenderSound, bgm, winSound;

function preload() {
  for (let i = 0; i < fruits.length; i++) {
    randomFruit[fruitName[i]] = loadImage(fruits[i]);
  }

  for (let i = 0; i < blenders.length; i++) {
    blender[i] = loadImage(blenders[i]);
  }

  for (let i = 0; i < smoothies.length; i++) {
    smoothie[i] = loadImage(smoothies[i]);
  }

  for (let i = 0; i < tables.length; i++) {
    table[i] = loadImage(tables[i]);
  }

  for (let i = 0; i < lights.length; i++) {
    light[i] = loadImage(lights[i]);
  }

  textBubble = loadImage("background/text.png");

  pixelFont = loadFont("dogicapixel.ttf");

  cursor = loadImage("cursor.png");

  grabSound = loadSound("grab.mp3");
  blenderSound = loadSound("blenderbg.mp3");
  bgm = loadSound("bgm.mp3");
  winSound = loadSound("winSound.mp3");
}

let gameOver = false;
let startGame = false;
let firstScreen = true;
let insScreen = false;
let endlessMode = false;

function setup() {
  createCanvas(1600, 900);
  spawnFruits();

  noCursor();

  bgm.setVolume(0.2);
  bgm.loop();

  blenderSound.setVolume(0.1);
  grabSound.setVolume(1);
  winSound.setVolume(0.3);
  
  // intruction buttons
  but1 = new ButtonN(width / 2, 360);
  but2 = new ButtonE(width / 2, 540);
  but3 = new ButtonI(width / 2, 720);
}

function draw() {
  background(30);

  // menu screen / start screen
  if (firstScreen === true) {
    stroke(30);
    rectMode(CORNER);
    imageMode(CORNER);
    background(30);
    fill(128, 92, 65);
    rect(10, 10, 1580, 880);

    for (let i = 0; i < 6; i++) {
      y = i * 180 + 40;
      image(randomFruit[fruitName[i]], 100, y, 100, 100);
      image(randomFruit[fruitName[i + 5]], 1400, y, 100, 100);
    }

    textFont(pixelFont);
    strokeWeight(0);
    textSize(95);
    fill(255);
    textAlign(CENTER);
    text("SMOOTHIE RUSH", width / 2, 200);

    but1.display();
    but2.display();
    but3.display();

    // instruction popup screen
    if (insScreen === true) {
      rectMode(CORNER);
      fill(227, 174, 134);
      stroke(230);
      strokeWeight(5);
      rect(400, 250, 800, 550);
      noStroke();
      fill(40);
      text("Instructions", width / 2, 320);
      stroke(40);
      line(500, 350, 1100, 350);
      textSize(24);
      noStroke();
      textAlign(LEFT);
      text(
        "1. Click the right fruit before the time \n    runs out!",
        440,
        420
      );
      text(
        "2. Score 10 times to win. Or set a high \n    score in endless mode.",
        440,
        520
      );
      text(
        "3. (Normal) You'll get your randomized \n    win screen! You get a different one \n.   every time!",
        440,
        620
      );
      textAlign(CENTER);
      textSize(40);
      text("ENJOY!", width / 2, 760);
      stroke(40);
      fill(227, 174, 134);
      rect(410, 260, 30, 30);
      line(418, 268, 432, 282);
      line(418, 282, 432, 268);
    }
    imageMode(CENTER);
    image(cursor, mouseX, mouseY, 50, 50);
    return;
  }

  // game over screen
  if (gameOver === true) {
    fill(255);
    textSize(32);
    text("Game Over! Score: " + score, width / 2, height / 2);
    return;
  }

  // win screen condtion
  if (score === 10 && endlessMode === false) {
    winScreen();
    blenderSound.stop();
    winSound.play();
    return;
  }

  // blender score conditions
  if (score > 10) {
    blenderNum = 10;
  } else {
    blenderNum = score;
  }

  //            UI           //
  //layout
  rectMode(CORNER);
  noStroke();
  fill(148, 172, 209);
  rect(10, 10, 290, height - 20, 10);

  fill(128, 92, 65);
  rect(310, 10, 1280, height - 20, 10);
  // target text
  rectMode(CENTER);
  fill(227, 174, 134);
  rect(950, 60, 360, 70, 10);
  textAlign(CENTER);
  textFont(pixelFont);
  textSize(30);
  fill(0);
  text("Grab the      !", 950, 70);
  imageMode(CORNER);
  image(randomFruit[rightFruit], 1015, 37, 45, 45);

  // goal text
  fill(191, 226, 255);
  rect(155, 60, 260, 70, 10);
  rect(155, 703, 260, 60, 10);
  fill(0);
  if (endlessMode === false) {
    text("Score " + score + "/10", 155, 70);
  } else if (endlessMode === true) {
    text("Goal: " + score, 155, 70);
  }
  textSize(14);
  fill(110);
  text("Fill me up with fruits\nto make a smoothie!", 155, 700);

  //blender image
  imageMode(CENTER);
  image(blender[blenderNum], 160, 510, 260, 260);
  //           END of UI        //

  // timer and conditions
  let timer = totalTime - millis();
  let barColor;
  if (timer <= 0) {
    timer = 0;
    gameOver = true;
  }
  // timer bar
  if (timer > 1330) {
    barColor = color(166, 252, 157);
  } else if (timer > 670) {
    barColor = color(227, 204, 127);
  } else {
    barColor = color(196, 90, 90);
  }
  fill(barColor);
  rectMode(CENTER);
  let timerBar = map(timer, 0, 2000, 0, 1200);
  rect(width / 2 + 150, 120, timerBar, 20, 20);

  // displaying the fruit images
  for (let f of fruitPos) {
    imageMode(CENTER);
    image(f.img, f.x, f.y, 100, 100);
  }

  // cursor
  image(cursor, mouseX, mouseY, 50, 50);
}

function mousePressed() {
  if (gameOver) return;

  // main menu buttons
  but1.click();
  but2.click();
  but3.click();

  if (startGame === true) {
    for (let i = 0; i < fruitPos.length; i++) {
      let f = fruitPos[i];

      // rough boundaries for each fruit
      if (
        mouseX > f.x - 40 &&
        mouseX < f.x + 40 &&
        mouseY > f.y - 40 &&
        mouseY < f.y + 40
      ) {
        if (f.name === rightFruit && startGame === true) {
          // ✅ match target correctly
          score++;
          spawnFruits();
          grabSound.play();
          // firstScreen = false;
        } else {
          gameOver = true;
        }
        break; // stop checking once a fruit is clicked
      }
    }
  }
}

function spawnFruits() {
  rightFruit = random(fruitName);

  fruitPos = [];
  // set values for the fruits
  let fruitSize = 100;
  let rx = random(370, 1530);
  let ry = random(195, 850);

  // randomized values for the correct fruit
  fruitPos.push({
    x: rx,
    y: ry,
    name: rightFruit,
    img: randomFruit[rightFruit],
  });

  // randomized values container for the fruits
  for (let i = 0; i < 14; i++) {
    let noOverlap = false;
    let fx, fy, ftype;

    // makes sure each fruit don't overlap (had to use ai for some help)
    while (!noOverlap) {
      fx = random(370, 1530);
      fy = random(195, 850);
      ftype = random(fruitName);

      noOverlap = true;
      for (let f of fruitPos) {
        let d = dist(fx, fy, f.x, f.y);
        if (d < fruitSize) {
          noOverlap = false;
          break;
        }
      }
      totalTime = millis() + 1600;
    }
    // fruit parameters
    fruitPos.push({
      x: fx,
      y: fy,
      name: ftype,
      img: randomFruit[ftype],
    });
  }
}

function winScreen() {
  noLoop();
  rectMode(CORNER);
  fill(128, 92, 65);
  rect(10, 10, 1580, 880);

  let randomInt = int(random(3));
  fill(255);

  // random background
  for (let i = 0; i < 7; i++) {
    fill(123, 88, 61);
    noStroke();
    ellipseMode(CENTER);
    ellipse(random(100, 750), random(100, 800), random(80, 160));
    160;
  }

  for (let i = 0; i < 7; i++) {
    fill(123, 88, 61);
    noStroke();
    ellipseMode(CENTER);
    ellipse(random(750, 1500), random(100, 800), random(80, 160));
    160;
  }

  // random colored light background
  for (let i = 0; i < 10; i++) {
    let x = i * 290.5 + 10;
    imageMode(CORNER);
    image(light[randomInt], x, 0, 300, 300);
    strokeWeight(10);
    line(1596, 0, 1595, 900);
    imageMode(CENTER);
  }

  // randomied images
  image(table[int(random(3))], width / 2, 390, 1000, 1000);
  image(smoothie[int(random(9))], width / 2, 480, 800, 800);

  textFont(pixelFont);
  textLeading(20);
  textAlign(LEFT);
  textSize(12);
  fill(50);
  text("Note: You get a different \nscreen every time you win!", 1340, 850);

  imageMode(CENTER);
  image(textBubble, width / 2, 320, 690, 550);
  //"(compliment)! You made a (adjective) smoothie! You are now a fruit (noun)!"
  fill(0);
  textSize(24);
  textLeading(40);
  textAlign(CENTER);
  // random win text message
  text(
    compliment[int(random(3))] +
      " You made \na " +
      adjective[int(random(3))] +
      " smoothie! \nYou are now a \nFruit " +
      noun[int(random(3))] +
      "!",
    width / 2,
    177
  );
}

// Normal Mode Button
class ButtonN {
  constructor(tempXpos, tempYpos) {
    this.xpos = tempXpos;
    this.ypos = tempYpos;
  }

  click() {
    let halfW = 500 / 2;
    let halfH = 100 / 2;

    //boxcar reference
    if (
      mouseX > this.xpos - halfW &&
      mouseX < this.xpos + halfW &&
      mouseY > this.ypos - halfH &&
      mouseY < this.ypos + halfH &&
      startGame === false
    ) {
      // starts normal mode game
      firstScreen = false;
      startGame = true;
      console.log("open normal");
      totalTime = millis() + 1600;
      blenderSound.loop();
    }
  }

  display() {
    rectMode(CENTER);
    fill(227, 174, 134);
    stroke(230);
    strokeWeight(5);
    rect(this.xpos, this.ypos, 500, 100);
    textAlign(CENTER);
    noStroke();
    textSize(40);
    fill(40);
    text("Normal", this.xpos, this.ypos + 15);
  }
}

class ButtonE {
  constructor(tempXpos, tempYpos) {
    this.xpos = tempXpos;
    this.ypos = tempYpos;
  }

  click() {
    let halfW = 500 / 2;
    let halfH = 100 / 2;

    //boxcar reference
    if (
      mouseX > this.xpos - halfW &&
      mouseX < this.xpos + halfW &&
      mouseY > this.ypos - halfH &&
      mouseY < this.ypos + halfH &&
      startGame === false
    ) {
      // starts endless mode game
      console.log("open endless");
      firstScreen = false;
      startGame = true;
      totalTime = millis() + 1600;
      endlessMode = true;
      blenderSound.loop();
    }
  }

  display() {
    rectMode(CENTER);
    fill(227, 174, 134);
    stroke(230);
    strokeWeight(5);
    rect(this.xpos, this.ypos, 500, 100);
    textAlign(CENTER);
    noStroke();
    textSize(40);
    fill(40);
    text("Endless", this.xpos, this.ypos + 15);
  }
}

class ButtonI {
  constructor(tempXpos, tempYpos) {
    this.xpos = tempXpos;
    this.ypos = tempYpos;
  }

  click() {
    let halfW = 500 / 2;
    let halfH = 100 / 2;

    //boxcar reference
    if (
      mouseX > this.xpos - halfW &&
      mouseX < this.xpos + halfW &&
      mouseY > this.ypos - halfH &&
      mouseY < this.ypos + halfH &&
      startGame === false
    ) {
      // opens instruction
      console.log("open ins");
      insScreen = true;
    }

    // closes instruction
    if (
      mouseX > 410 &&
      mouseX < 440 &&
      mouseY > 260 &&
      mouseY < 290 &&
      startGame === false
    ) {
      insScreen = false;
      console.log("hello");
    }
  }

  display() {
    rectMode(CENTER);
    fill(227, 174, 134);
    stroke(230);
    strokeWeight(5);
    rect(this.xpos, this.ypos, 500, 100);
    textAlign(CENTER);
    noStroke();
    textSize(40);
    fill(40);
    text("Instructions", this.xpos, this.ypos + 15);
  }
}
