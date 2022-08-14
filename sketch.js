var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var invisableGround, invisableWall1, invisableWall2;
var score=0;
var gameOver,gameOverImg;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  gameOverImg= loadImage("gameover.png");
  doorsGroup=new Group();
  climbersGroup=new Group();
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  

  invisableGround=createSprite(300,530,600,10);
 invisableGround.visible = false;

 invisableWall1=createSprite(100,300,10,600);
 invisableWall1.visible = false;

 invisableWall2=createSprite(500,300,10,600);
 invisableWall2.visible=false;

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(300,450,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.4;
  ghost.setCollider("circle",0,0,40);
  ghost.debug = false;

  gameOver=createSprite(300,300,100,100);
  gameOver.addImage("gameover",gameOverImg);
  gameOver.scale=1.5
  gameOver.visible=false;

  //gameOver.depth = doorsGroup.depth
  //gameOver.depth = climbersGroup.depth;
  gameOver.depth = ghost.depth;
  gameOver.depth= gameOver.depth + 1; 
}

function draw() {
 background("black");
 
 //gameState="play";
 if(gameState ==="play"){
  
      spawnObjects();
    
      if(ghost.isTouching(doorsGroup)){
    
       gameState = "end"

      }   
      
      if(gameState === "end"){
        tower.velocityY = 0;

        doorsGroup.setVelocityYEach(0);
        climbersGroup.setVelocityYEach(0);

        gameOver.visible=true;
        
        ghost.destroy();
  
        doorsGroup.destroyEach();
        climbersGroup.destroyEach();
  
        doorsGroup.setLifetimeEach(-1);
        climbersGroup.setLifetimeEach(-1);
      }
 }

 ghost.collide(invisableGround);
  ghost.collide(invisableWall1);
  ghost.collide(invisableWall2);
  
    if(tower.y > 400){
        tower.y = 300
      }
  
      if(keyDown("space")){
  ghost.velocityY=-5;
      }
  
      ghost.velocityY=ghost.velocityY+2
  
      if(keyDown("right_arrow")){
        ghost.x=ghost.x+3;
      }
  
      if(keyDown("left_arrow")){
        ghost.x=ghost.x-3;
      }

    fill("white");
    text("Score :",score,400,100)
      score=score+frameCount;
    drawSprites();
}

function spawnObjects(){
if(frameCount % 300===0) {
var door = createSprite(300,1);
door.addImage("door", doorImg);
var climber= createSprite(300,66);
climber.addImage("climber",climberImg);
door.x =Math.round(random(100,500));
door.velocityY=1;
climber.x=door.x;
climber.velocityY=1;
door.lifetime=800;
climber.lifetime=800;
doorsGroup.add(door);
climbersGroup.add(climber);
ghost.depth=door.depth;
 ghost.depth=climber.depth;
 ghost.depth+=1;
 
}
}


