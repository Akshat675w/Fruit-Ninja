//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;

var fruit;
var monster;

var fruitImage1 , fruitImage2 , fruitImage3  , fruitImage4;
var monsterImage;

var gameover;

var gameoversound;
var knifesound;
function preload(){
  
  knifeImage = loadImage("knife.png");
  fruitImage1 = loadImage("fruit1.png");
  fruitImage2 = loadImage("fruit2.png");
  fruitImage3 = loadImage("fruit3.png");
  fruitImage4 = loadImage("fruit4.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  gameoverImage=loadImage("gameover.png")
  
  knifesound = loadSound("knifeSwoosh.mp3");
  gameoversound = loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600, 600);
  
 
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
   knife.setCollider("rectangle",0,0,40,40);
   score=0;
   fruitsGroup = new Group();
   monsterGroup = new Group();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    fruits();
    spawnmonster();
    knife.y=World.mouseY;
    knife.x=World.mouseX;
   if(fruitsGroup.isTouching(knife)){
     fruitsGroup.destroyEach()
     score = score +1;   
     knifesound.play();
  
   }
    else{
    if(monsterGroup.isTouching(knife)){
      gameState = END ;
      fruitsGroup.destroyEach();
      monsterGroup.destroyEach();
      fruitsGroup.setVelocityXEach(0);
      monsterGroup.setVelocityXEach(0);
      fruitsGroup.setVelocityYEach(0);
      monsterGroup.setVelocityYEach(0);
      knife.addImage(gameoverImage);
      knife.scale = 2;
      knife.x = 300;
      knife.y = 300;
      gameoversound.play();    
      score = 0
} }  
  }
  
  drawSprites();
  
  textSize(25);
  text("Score : "+ score,250,50);
 
}

function fruits(){
 if(World.frameCount % 80 ===0){
   fruit = createSprite(400,200,20,20);
  fruit.scale = 0.2;
   tos = Math.round(random(1,2))
   if(tos == 1){
     fruit.x = 600;
     fruit.velocityX = -(7+(score/4)) 
   }
   else{
     if(tos == 2 ){
       fruit.x = 0;
       fruit.velocityX = (7+(score/4))
     }
   }
  r = Math.round(random(1,4));
  if(r == 1){
  fruit.addImage(fruitImage1);
  
  } else if(r == 2){
    fruit.addImage(fruitImage2);
  }
  
  else  if(r ==3){
  fruit.addImage(fruitImage3);
  }
  else if(r == 4){
    fruit.addImage(fruitImage4);
  }
  fruit.y = Math.round(random(50,550));
  
  
  fruit.setlifetime = 100;
  fruitsGroup.add(fruit);
 }
 }

function spawnmonster(){
  if(World.frameCount % 100 ===0){
  monster = createSprite(400,200,20,20);
  monster.scale = 1;
  
  monster.addAnimation("moving",monsterImage)
  monster.y = Math.round(random(50,340));
  
 
  monster.velocityX = -(7+(score/10));
  monster.setlifetime = 100;
  
  monsterGroup.add(monster);
}
}