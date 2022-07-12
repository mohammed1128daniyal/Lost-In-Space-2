var PLAY = 1;
var END = 0;
var gameState = 1;
var score = 0;
var space,spaceImg;
var rocket,rocketImg;
var gameover,gameoverImg;
var meteor,meteorImg;
var edge1,edge2,edge3,edge4;      

function preload() {

  rocketImg = loadImage("rocket.png");
  spaceImg = loadImage("space.jpg");
  meteorImg = loadImage("meteor.png");
  gameoverImg = loadImage("gameover.jpg");
  
}

function setup() {
  createCanvas(600,600);
  
  space = createSprite(300,300);
  space.addImage(spaceImg);
  space.velocityY = 1;
  
  rocket = createSprite(300,300);
  rocket.addImage(rocketImg);
  rocket.scale = 0.7;
  
  gameover = createSprite(300,300);
  gameover.visible = false;
  gameover.addImage(gameoverImg);
  gameover.scale = 2.1;
  
  edge1 = createSprite(300,0,600,1);
  edge1.shapeColor = "black";
  edge2 = createSprite(300,600,600,1);
  edge2.shapeColor = "black";
  edge3 = createSprite(0,300,1,600);
  edge3.shapeColor = "black";
  edge4 = createSprite(600,300,1,600);
  edge4.shapeColor = "black";
  
  meteorGroup = new Group();
  
  rocket.setCollider("circle",0,0,40);
}

function draw() {
  background(220);
  
if (gameState === PLAY){
  
  camera.x = rocket.x;
  camera.y = rocket.y;
  
  if (space.y>360){
    space.y = 240;
  }
  
  if (keyDown("right")){
    rocket.x = rocket.x +3;
  }
  
  if (keyDown("left")){
    rocket.x = rocket.x -3;
  }
  
  if (keyDown("UP_ARROW")){
    meteorGroup.velocityY = +3;
    space.y = space.y +3;
  } 
  
  if (rocket.isTouching(meteor || edge1 || edge2 || edge3 || edge4)){
    gameState = END;
  }
  
  if (rocket.isTouching(edge1)){
    gameState = END;
  }  
  
  if (rocket.isTouching(edge2)){
    gameState = END;
  } 
  
  if (rocket.isTouching(edge3)){
    gameState = END;
  } 
  
  if (rocket.isTouching(edge4)){
    gameState = END;
  } 
  
  spawnmeteor();
  
 }
      
else 
  
if (gameState === END){
  
  meteorGroup.destroyEach();
  rocket.visible = false;
  space.setVelocity(0,0);
  space.visible = false;
  gameover.visible = true;
  
 }

  

  drawSprites();
  
  fill("lightgreen");
  stroke("black");
  textSize(25);
  text("SCORE : "+ score,20,50);
}

function spawnmeteor() {
  
if (frameCount % 240 === 0){
  
  meteor = createSprite(200,-50);
  meteor.addImage(meteorImg);
  meteor.x = Math.round(random(75,525));
  meteor.velocityY = 3;
  meteorGroup.add(meteor);
  meteor.scale = 0.4;
  meteor.setLifeTime = 800;
  
  rocket.depth = meteor.depth;
  rocket.depth +=1;
 } 
  
if (frameCount % 100 === 0){
  
  score = score + 1;
  
 }
}