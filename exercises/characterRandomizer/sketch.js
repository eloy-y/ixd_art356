// variables
let bluegun1, bluegun2, bluegun3;
let fruit1, fruit2, fruit3;
let slime1, slime2, slime3;
let firstslime;

let gun_id;
let fruit_id;
let slime_id;

let shot;

let shootGun = false;

let hideIns3 = true;
let hideIns1 = true;
let hideIns2 = false;
let toggleHide = true;
let summoned = false;

function preload() {
  bluegun1 = loadImage("bluegun1.png");
  bluegun2 = loadImage("bluegun2.png");
  bluegun3 = loadImage("bluegun3.png");

  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");

  firstslime = loadImage("firstslime.png");
  secondslime = loadImage("secondslime.png");
  thirdslime = loadImage("thirdslime.png");
}

function setup() {
  createCanvas(600, 400);

  shot1 = new Projectile(fruit1, 135, 170, 8);
  shot2 = new Projectile(fruit2, 135, 170, 8);
  shot3 = new Projectile(fruit3, 135, 170, 8);
}

function draw() {
  background(100);
  let slime1 = firstslime.get(20, 20, 25, 25);
  let slime2 = secondslime.get(20, 20, 25, 25);
  let slime3 = thirdslime.get(20, 20, 25, 25);

  rectMode(CORNER);
  fill(220);
  textAlign(LEFT);
  textSize(20);
  text("Ammo: ", 20, 40);
  noStroke();
  rect(90, 17.5, 30, 30);

  if (hideIns1 === false) {
    text("< - Press ' 2 ' to get random ammo ", 130, 40);
  }

  if (shootGun === true && fruit_id === 1) {
    shot1.show();
    shot1.drive();
  } else if (shootGun === true && fruit_id === 2) {
    shot2.show();
    shot2.drive();
  } else if (shootGun === true && fruit_id === 3) {
    shot3.show();
    shot3.drive();
  }

  //gun
  textAlign(CENTER);
  if (hideIns2 === false) {
    text("Press ' 1 ' to get \na random gun", 100, 180);
  }

  if (gun_id == 1) {
    push();
    translate(width / 2, height / 2);
    rotate((PI / 180) * 40);
    imageMode(CENTER);
    image(bluegun1, -180, 140, 100, 100);
    pop();
  } else if (gun_id == 2) {
    push();
    translate(width / 2, height / 2);
    rotate((PI / 180) * 40);
    imageMode(CENTER);
    image(bluegun2, -180, 140, 100, 100);
    pop();
  } else if (gun_id == 3) {
    push();
    translate(width / 2, height / 2);
    rotate((PI / 180) * 40);
    imageMode(CENTER);
    image(bluegun3, -180, 140, 100, 100);
    pop();
  }

  //fruit
  if (fruit_id == 1) {
    image(fruit1, 90, 18, 30, 30);
  } else if (fruit_id == 2) {
    image(fruit2, 92, 20, 25, 25);
  } else if (fruit_id == 3) {
    image(fruit3, 90, 17, 32, 32);
  }
  //slime
  textSize(16);
  if (hideIns2 === true && hideIns1 === true) {
    text("press ' 3 ' to \nsummon \nmonster", 480, 160);
  }

  if (slime_id === 1) {
    image(slime1, 380, 80, 200, 200);
  } else if (slime_id === 2) {
    image(slime2, 380, 80, 200, 200);
  } else if (slime_id === 3) {
    image(slime3, 380, 80, 200, 200);
  }

  textSize(30);
  if (summoned === true) {
    text("SPACEBAR TO SHOOT", 420, 360);
    textSize(20);
    textAlign(LEFT);
    text("Reminder: ", 20, 360);
    textSize(12);
    text("1 for random gun", 120, 345);
    text("2 for ra1ndom ammo", 120, 360);
    text("3 for random slime", 120, 375);
  }
}

function keyPressed() {
  if (keyCode === 49) {
    shuffleGun();
    hideIns2 = true;
    if (toggleHide === true) {
      hideIns1 = false;
      toggleHide = false;
    }
  }

  if (keyCode === 50) {
    shuffleFruit();
    hideIns1 = true;
  }

  if (keyCode === 51) {
    shuffleSlime();
    summoned = true;
  }

  if (keyCode === 32) {
    shootGun = true;
  }
}

function shuffleGun() {
  gun_id = int(random(1, 4));
}

function shuffleFruit() {
  fruit_id = int(random(1, 4));
}

function shuffleSlime() {
  slime_id = int(random(1, 4));
}

class Projectile {
  constructor(tempImage, tempX, tempY, tempSpeed) {
    this.x = tempX;
    this.y = tempY;
    this.speed = tempSpeed;
    this.image = tempImage;
  }

  show() {
    image(this.image, this.x, this.y, 32, 32);
  }

  drive() {
    this.x = this.x + this.speed;

    if (this.x > 400) {
      this.x = 135;
      shootGun = false;
    }
  }
}
