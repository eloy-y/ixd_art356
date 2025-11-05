let dfData;

// font
let mainFont;
let mainFontBold;

// images
let skull;
let crossbones;
let logo;
let wp;
let bounty;
let meme = false;
let memesound;
let memeimg;
let hatcursor;
let watch, watch1, watch2, watch3, watch4;

let berries;
let price1 = ["800M", "999M", "300M", "940M", "500M", "200M"];
let price2 = ["200M", "100M", "350M", "400M", "850M", "900M"];
let price3 = ["600M", "840M", "950M", "820M", "860M", "640M"];
let fruitScreen = false;

let dfName;
let dfType;
let dfImg;
let trans;
let desc;
let minusY = 0;

// df images
let gura;
let kage;
let mero;
let mochi;
let nikyu;
let ope;

let hebi;
let neko;
let ryu;
let tori;
let uo;
let zo;

let gasu;
let hie;
let magu;
let moku;
let pika;
let yami;

function preload() {
  dfData = loadJSON("https://api.api-onepiece.com/v2/fruits/en");

  mainFont = loadFont("playfair.ttf");
  mainFontBold = loadFont("bold.ttf");

  skull = loadImage("images/Skull.png");
  crossbones = loadImage("images/Crossbones.png");
  logo = loadImage("images/onepiecelogo.png");
  berries = loadImage("images/berries.png");
  bounty = loadImage("images/Bounty.png");
  wp = loadImage("images/Menu.jpg");
  hatcursor = loadImage("images/cursor.png");
  memeimg = loadImage("images/real.jpg");
  memesound = loadSound("images/meme.mp3");
  watch = loadImage("images/watch.jpg");
  watch1 = loadImage("images/watch1.jpeg");
  watch2 = loadImage("images/watch2.jpeg");
  watch3 = loadImage("images/watch3.jpeg");
  watch4 = loadImage("images/watch4.jpeg");

  gura = loadImage("paramecia/gura.jpg");
  kage = loadImage("paramecia/kage.jpg");
  mero = loadImage("paramecia/mero.jpg");
  mochi = loadImage("paramecia/mochi.jpg");
  nikyu = loadImage("paramecia/nikyu.jpg");
  ope = loadImage("paramecia/ope.jpg");

  hebi = loadImage("zoan/hebi.jpg");
  neko = loadImage("zoan/neko.jpg");
  ryu = loadImage("zoan/ryu.jpg");
  tori = loadImage("zoan/tori.jpg");
  uo = loadImage("zoan/uo.jpg");
  zo = loadImage("zoan/zo.jpg");

  gasu = loadImage("logia/gasu.jpg");
  hie = loadImage("logia/hie.jpg");
  magu = loadImage("logia/magu.jpg");
  moku = loadImage("logia/moku.jpg");
  pika = loadImage("logia/pika.jpg");
  yami = loadImage("logia/yami.jpg");
}

function setup() {
  createCanvas(1400, 980);
}

function draw() {
  noCursor();
  background(212, 199, 169);
  image(wp, 0, 0, 1400, 980);

  // TOP SECTION - TEXT//
  noStroke();
  fill(68, 58, 40);
  textFont(mainFontBold);
  textAlign(CENTER);
  textSize(96);
  text("DEVIL FRUIT MENU", width / 2, 100);

  textFont("INTER");
  textStyle(ITALIC);
  textSize(24);
  fill(126, 117, 97);
  text("Click on the menu items to get more details", width / 2, 160);

  // IMAGES //
  image(skull, 30, 15, 100, 100);
  image(skull, 1270, 15, 100, 100);
  ////////////////////////////////////////////////////////////////////////

  // MIDDLE SECTION - LAYOUT//
  fill(43, 36, 26);
  noStroke();
  rect(38, 215, 4, 575);
  for (let i = 0; i < 11; i++) {
    ellipseMode(CENTER);
    let w = i * 58;
    ellipse(40, w + 215, 20, 20);
  }

  rect(478, 215, 4, 575);
  for (let i = 0; i < 11; i++) {
    ellipseMode(CENTER);
    let w = i * 58;
    ellipse(480, w + 215, 20, 20);
  }

  rect(918, 215, 4, 575);
  for (let i = 0; i < 11; i++) {
    ellipseMode(CENTER);
    let w = i * 58;
    ellipse(920, w + 215, 20, 20);
  }

  rect(1358, 215, 4, 575);
  for (let i = 0; i < 11; i++) {
    ellipseMode(CENTER);
    let w = i * 58;
    ellipse(1360, w + 215, 20, 20);
  }

  // MIDDLE SECTION - TEXT //
  textFont(mainFontBold);
  textSize(40);
  fill(68, 58, 40);
  textAlign(LEFT);

  text("PARAMECIA", 137, 240);
  text("ZOAN", 645, 240);
  text("LOGIA", 1075, 240);

  // API TEXT //
  textSize(20);
  fill(43, 36, 26);

  // PARAMECIA
  text(dfData[24].roman_name, 70, 310);
  text(dfData[26].roman_name, 70, 390);
  text(dfData[30].roman_name, 70, 470);
  text(dfData[34].roman_name, 70, 550);
  text(dfData[21].roman_name, 70, 630);
  text(dfData[68].roman_name, 70, 710);

  // ZOAN
  let leopard = dfData[97].roman_name.replace("moderu:", "\nModel:");
  text(leopard, 505, 310);

  let snake = dfData[101].roman_name.replace("moderu:", "\nModel:");
  text(snake, 505, 390);

  let dino = dfData[110].roman_name.replace("Moderu", "\nModel:");
  text(dino, 505, 470);

  let mammoth = dfData[111].roman_name.replace(", moderu", "\nModel:");
  text(mammoth, 505, 550);

  let phoenix = dfData[119].roman_name.replace(", Moderu", "\nModel:");
  text(phoenix, 505, 630);

  let fish = dfData[121].roman_name.replace(", Moderu", "\nModel:");
  text(fish, 505, 710);

  // LOGIA
  text(dfData[79].roman_name, 945, 310);
  text(dfData[83].roman_name, 945, 390);
  text(dfData[84].roman_name, 945, 470);
  text(dfData[85].roman_name, 945, 550);
  text(dfData[86].roman_name, 945, 630);
  text(dfData[88].roman_name, 945, 710);

  // LINES AND PRICE
  // Paramecia
  stroke(43, 36, 26);
  strokeWeight(2);
  drawingContext.setLineDash([10, 5]);

  line(260, 305, 375, 305);
  line(230, 385, 375, 385);
  line(255, 465, 375, 465);
  line(245, 545, 375, 545);
  line(245, 625, 375, 625);
  line(270, 705, 375, 705);

  for (let i = 0; i < 6; i++) {
    noStroke();
    textSize(18);
    let w = i * 79.8;
    text(price1[i], 410, w + 310);
    image(berries, 385, w + 290);
  }

  // Zoan
  stroke(43, 36, 26);
  strokeWeight(2);
  drawingContext.setLineDash([10, 5]);

  line(680, 305, 815, 305);
  line(670, 385, 815, 385);
  line(655, 465, 815, 465);
  line(625, 545, 815, 545);
  line(665, 625, 815, 625);
  line(635, 705, 815, 705);

  for (let i = 0; i < 6; i++) {
    noStroke();
    textSize(18);
    let w = i * 79.8;
    text(price2[i], 850, w + 310);
    image(berries, 825, w + 290);
  }

  // Logia
  stroke(43, 36, 26);
  strokeWeight(2);
  drawingContext.setLineDash([10, 5]);

  line(1135, 305, 1255, 305);
  line(1090, 385, 1255, 385);
  line(1120, 465, 1255, 465);
  line(1105, 545, 1255, 545);
  line(1125, 625, 1255, 625);
  line(1120, 705, 1255, 705);

  for (let i = 0; i < 6; i++) {
    noStroke();
    textSize(18);
    let w = i * 79.8;
    text(price3[i], 1290, w + 310);
    image(berries, 1265, w + 290);
  }
  ///////////////////////////////////////////////////////////////////////////////

  // BOTTOM SECTION - IMAGES //
  image(crossbones, 210, 830, 100, 100);
  image(crossbones, 1110, 830, 100, 100);
  image(logo, 550, 850, 182 * 1.7, 62 * 1.7);
  //////////////////////////////////////////////////////////////////////////

  if (fruitScreen === true) {
    dfScreen();
  }

  console.log(meme);

  if (meme === true) {
    image(watch, 390, 30, 510 * 1.2, 601 * 1.2);

    drawingContext.setLineDash([]);
    stroke(33, 23, 17);
    line(675, 775, 725, 825);
    line(675, 825, 725, 775);
  }
  imageMode(CORNER);
  imageMode(CENTER);
  image(hatcursor, mouseX, mouseY, 30, 30);
  imageMode(CORNER);
}

function mousePressed() {
  // Close Devil Fruit Screen //
  if (mouseX > 665 && mouseX < 735 && mouseY > 755 && mouseY < 835) {
    fruitScreen = false;
    dfName = null;
    dfType = null;
    dfImg = null;
    trans = null;
    desc = null;
    minusY = 0;
    meme = false;
  }

  // Paramecia
  if (mouseX > 60 && mouseX < 245 && mouseY > 290 && mouseY < 315) {
    fruitScreen = true;
    dfImg = nikyu;
    dfName = dfData[24].roman_name;
    dfType = dfData[24].type;
    trans = dfData[24].name;
    desc = dfData[24].description
      .replace("powerful", "\npowerful")
      .replace("everything", "\neverything")
      .replace("can '", "\ncan '");
  }

  if (mouseX > 60 && mouseX < 210 && mouseY > 370 && mouseY < 395) {
    fruitScreen = true;
    dfImg = ope;
    dfName = dfData[26].roman_name;
    dfType = dfData[26].type;
    trans = dfData[26].name;
    desc = dfData[26].description
      .replace("can", "\ncan")
      .replace("to extending", "\nto extending")
      .replace("up its victims", "\nup its victims")
      .replace("anything in", "\nanything in")
      .replace("heart", "\nheart")
      .replace("several", "\nseveral")
      .replace("demon fruit", "demon \nfruit")
      .replace("eternal youth", "\neternal youth");
    minusY = 5;
  }

  if (mouseX > 60 && mouseX < 230 && mouseY > 450 && mouseY < 475) {
    fruitScreen = true;
    dfImg = mero;
    dfName = dfData[30].roman_name;
    dfType = dfData[30].type;
    trans = dfData[30].name;
    desc = dfData[30].description
      .replace("a variety", "\na variety")
      .replace("people or", "\npeople or")
      .replace("kisses,", "\nkisses,")
      .replace("an attraction", "\nan attraction")
      .replace("reverses", "\nreverses")
      .replace("spent", "\nspent");
  }

  if (mouseX > 60 && mouseX < 225 && mouseY > 530 && mouseY < 555) {
    fruitScreen = true;
    dfImg = gura;
    dfName = dfData[34].roman_name;
    dfType = dfData[34].type;
    trans = dfData[34].name;
    desc = dfData[34].description
      .replace("or c", "\nor c")
      .replace("within", "\nwithin")
      .replace("var", "\nvar")
      .replace("disp", "\ndisp")
      .replace("that it", "\nthat it")
      .replace("cov", "\ncov");
  }

  if (mouseX > 60 && mouseX < 225 && mouseY > 610 && mouseY < 635) {
    fruitScreen = true;
    dfImg = kage;
    dfName = dfData[21].roman_name;
    dfType = dfData[21].type;
    trans = dfData[21].name;
    desc = dfData[21].description
      .replace("of a", "\nof a")
      .replace("removed", "\nremoved")
      .replace("zombies", "\nzombies")
      .replace("to whom", "\nto whom")
      .replace("the body", "\nthe body")
      .replace("time,", "\ntime,")
      .replace(
        "For example, its user has consumed up to 1000 of them. It should also be noted that the user can use his own shadow and make it tangible. He can therefore use his shadow to teleport or protect himself from physical attacks.",
        ""
      );
  }

  if (mouseX > 60 && mouseX < 250 && mouseY > 690 && mouseY < 715) {
    fruitScreen = true;
    dfImg = mochi;
    dfName = dfData[68].roman_name;
    dfType = "Special " + dfData[68].type;
    trans = dfData[68].name;
    desc = dfData[68].description
      .replace("the user to b", "\nthe user to b")
      .replace("quant", "\nquant")
      .replace("simi", "\nsimi")
      .replace("limbs", "\nlimbs")
      .replace("diss", "\ndiss")
      .replace("special", "\nspecial");
  }

  // Zoan
  if (mouseX > 500 && mouseX < 670 && mouseY > 290 && mouseY < 350) {
    fruitScreen = true;
    dfImg = neko;
    dfName = dfData[97].roman_name.replace("moderu:", "\nModel:");
    dfType = dfData[97].type;
    trans = dfData[97].name.replace(", Leopard version", "");
    desc = dfData[97].description
      .replace("whoever", "Whoever")
      .replace("speed", "\nspeed")
      .replace("techniques", "\ntechniques")
      .replace("agile", "\nagile");
  }

  if (mouseX > 500 && mouseX < 675 && mouseY > 370 && mouseY < 430) {
    fruitScreen = true;
    dfImg = hebi;
    dfName = dfData[101].roman_name.replace("moderu:", "\nModel:");
    dfType = dfData[101].type;
    trans = dfData[101].name.replace(", Anaconda version", "");
    desc = dfData[101].description
      .replace("allo", "Allo")
      .replace("plea", "\nplea");
    minusY = 5;
  }

  if (mouseX > 500 && mouseX < 690 && mouseY > 450 && mouseY < 510) {
    fruitScreen = true;
    dfImg = ryu;
    dfName = dfData[110].roman_name.replace("Moderu", "\nModel:");
    dfType = dfData[110].type;
    trans = dfData[110].name.replace(", Allosaurus version", "");
    desc = dfData[110].description.replace("who", "Who");
  }

  if (mouseX > 500 && mouseX < 675 && mouseY > 530 && mouseY < 590) {
    fruitScreen = true;
    dfImg = zo;
    dfName = dfData[111].roman_name.replace(", moderu", "\nModel:");
    dfType = dfData[111].type;
    trans = dfData[111].name.replace(", Mammoth version", "");
    desc = dfData[111].description
      .replace("who", "Who")
      .replace("stre", "\nstre")
      .replace("hard", "\nhard")
      .replace("phy", "\nphy");
  }

  if (mouseX > 500 && mouseX < 680 && mouseY > 610 && mouseY < 670) {
    fruitScreen = true;
    dfImg = tori;
    dfName = dfData[119].roman_name.replace(", Moderu", "\nModel:");
    dfType = dfData[119].type;
    trans = dfData[119].name.replace(
      "Fruit du Félin, saber-toothed tiger version",
      "Fruit of the Bird"
    );
    desc = dfData[119].description
      .replace("who", "Who")
      .replace("and h", "\nand h");
  }

  if (mouseX > 500 && mouseX < 640 && mouseY > 690 && mouseY < 750) {
    fruitScreen = true;
    dfImg = uo;
    dfName = dfData[121].roman_name.replace(", Moderu", "\nModel:");
    dfType = dfData[121].type;
    trans = dfData[121].name.replace(", Azure Dragon version", "");
    desc = dfData[121].description.replace("who", "Who");
  }

  // Logia
  if (mouseX > 940 && mouseX < 1120 && mouseY > 290 && mouseY < 315) {
    fruitScreen = true;
    dfImg = moku;
    dfName = dfData[79].roman_name;
    dfType = dfData[79].type;
    trans = dfData[79].name;
    desc = dfData[79].description
      .replace("the e", "The e")
      .replace("to c", "\nto c")
      .replace("s smoke", "s \nsmoke");
  }

  if (mouseX > 940 && mouseX < 1080 && mouseY > 370 && mouseY < 395) {
    fruitScreen = true;
    dfImg = hie;
    dfName = dfData[83].roman_name;
    dfType = dfData[83].type;
    trans = dfData[83].name;
    desc = dfData[83].description
      .replace("the b", "The b")
      .replace("anything", "\nanything")
      .replace("waves", "\nwaves")
      .replace("and is", "\nand is")
      .replace("inten", "\ninten")
      .replace("oppon", "\noppon")
      .replace("for 1", "\nfor 1");
    minusY = 5;
  }

  if (mouseX > 940 && mouseX < 1105 && mouseY > 450 && mouseY < 475) {
    fruitScreen = true;
    dfImg = yami;
    dfName = dfData[84].roman_name;
    dfType = dfData[84].type;
    trans = dfData[84].name;
    desc = dfData[84].description
      .replace("the b", "The b")
      .replace("becomes", "\nbecomes")
      .replace("absorb", "\nabsorb")
      .replace("it.", "\nit.")
      .replace("s when", "s \nwhen")
      .replace("cannot", "\ncannot")
      .replace("sens", "\nsens")
      .replace("demon fruit,", "\ndemon fruit,");
  }

  if (mouseX > 940 && mouseX < 1095 && mouseY > 530 && mouseY < 555) {
    fruitScreen = true;
    dfImg = pika;
    dfName = dfData[85].roman_name;
    dfType = dfData[85].type;
    trans = dfData[85].name;
    desc = dfData[85].description
      .replace("the b", "The b")
      .replace("move", "\nmove")
      .replace("the sp", "\nthe sp")
      .replace("enem", "\nenem")
      .replace("et", "\net");
  }

  if (mouseX > 940 && mouseX < 1120 && mouseY > 610 && mouseY < 635) {
    fruitScreen = true;
    dfImg = magu;
    dfName = dfData[86].roman_name;
    dfType = dfData[86].type;
    trans = dfData[86].name;
    desc = dfData[86].description
      .replace("the b", "The b")
      .replace("melt", "\nmelt")
      .replace("lava h", "\nlava h")
      .replace(", b", ",\nb")
      .replace("damage.", "\ndamage.");
  }

  if (mouseX > 940 && mouseX < 1110 && mouseY > 690 && mouseY < 715) {
    fruitScreen = true;
    dfImg = gasu;
    dfName = dfData[88].roman_name;
    dfType = dfData[88].type;
    trans = dfData[88].name;
    desc = dfData[88].description
      .replace("the b", "The b")
      .replace(", his", ",\nhis")
      .replace("the g", "\nthe g")
      .replace("inac", "\ninac")
      .replace("poisons", "\npoisons")
      .replace("and can", "\nand can")
      .replace("victims", "\nvictims")
      .replace("explos", "\nexplos");
  }

  if (mouseX > 550 && mouseX < 860 && mouseY > 850 && mouseY < 956) {
    meme = true;
  }
}

function dfScreen() {
  fill(0, 0, 0, 160);
  drawingContext.setLineDash([]);
  stroke(33, 23, 17);
  strokeWeight(3);
  rect(0, 0, 1400, 980);

  // fill(212, 199, 169);
  // rect(460, 45, 480, 700, 10);
  image(bounty, 440, 25);

  strokeWeight(6);

  fill(187, 157, 93);
  rect(665, 765, 70, 70, 10);
  line(675, 775, 725, 825);
  line(675, 825, 725, 775);

  textAlign(CENTER);
  noStroke();
  fill(33, 23, 17);
  textSize(40);
  text(dfName, width / 2, 100);

  textSize(36);
  text(trans, width / 2, 505);

  textFont(mainFont);
  textSize(26);
  text("(" + dfType + ")", width / 2, 540);

  textSize(16);
  textAlign(LEFT);
  text(desc, 490, 570 - minusY);

  fill(255);
  strokeWeight(8);
  stroke(33, 23, 17);
  rect(510, 170, 380, 295);
  image(dfImg, 510, 170);
}
