//Global Variables
var ground,banana,backGround,stone,monkey;



var groundImg,bananaImg,backgroundImg,stoneImg;



var monkey_running,monkey_collided;

var score;

var bananasGroup,stonesGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver,restart;
var gameOverImg,restartImg;




function preload(){
  groundImg=loadImage("ground.jpg");
  bananaImg=loadImage("Banana.png");
  backgroundImg=loadImage("jungle.jpg");
  stoneImg=loadImage("stone.png");
  
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkey_collided=loadImage("monkey_01.png");
  
}

gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  


function setup() {
  createCanvas(600,300);
  
  
  backGround=createSprite(300,300,600,300);
  backGround.addImage("jungle",backgroundImg);
  backGround.scale=1;
  
  monkey=createSprite(50,250,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.08;
  
  ground=createSprite(300,270,600,30);
  ground.visible=false;
  
  stonesGroup=new Group(); 
  bananasGroup=new Group();
  
  score = 0;
  
  gameOver=createSprite(300,100);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale=0.5;
  
  restart=createSprite(300,140);
  restart.addImage("restart",restartImg);
  restart.scale=0.5;
  
  
  gameOver.visible=false;
  restart.visible=false;
  
  
}


function draw(){
 background(180); 
  text("Score: "+ score, 500,50);
  
  if(gameState===PLAY){
    
    score = score + Math.round(getFrameRate()/60);
    
    backGround.velocityX=-2;
  
  if(keyDown("space")) {
    monkey.velocityY = -10;
  }
    
    if (backGround.x < 0){
    backGround.x = backGround.width/2;
      
    }
      
      if(stonesGroup.isTouching(monkey)){
    gameState=END;
  }
    
    spawnBananas();
  spawnStones();
    
 }
  
  else if(gameState===END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    backGround.velocityX=0;
    
    gameOver.visible=true;
    restart.visible=true;
    

    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  
  
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  bananasGroup.destroyEach();
  stonesGroup.destroyEach();
  
  monkey.changeAnimation("running",monkey_running);
  
  score = 0;
  
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImg);
    banana.scale = 0.06;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    
   
    
  
    
  }
}

function spawnStones() {
  if(frameCount % 100 === 0) {
    var stone = createSprite(600,250,10,40);
    stone.velocityX =-3;
    stone.addAnimation("stoneImg",stoneImg);
    stone.scale=0.1;
    
    stone.lifetime = 300;
    
    stonesGroup.add(stone);
    
   
  }
}