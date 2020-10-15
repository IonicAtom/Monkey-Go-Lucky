
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var gameState
var survivalTime = 0

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  gameState = "play";
  score = 0;
}



function setup() {
  createCanvas(600,420)
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
}


function draw() {
  background("lightGrey");
  
  monkey.collide(ground);
  
  if (gameState === "play"){
    ground.x = ground.width/2;
    if (keyDown("space")){
    monkey.velocityY = -12;
  }
  if (frameCount%80 === 0){
    spawnBanana();
  }
  if (frameCount% 300 === 0){
    spawnObstacle();
  }
  if (foodGroup.isTouching(monkey)){
    score = score+1;
    foodGroup.destroyEach();
  }
  if (obstacleGroup.isTouching(monkey)){
    gameState = "end";
  }
  survivalTime = Math.ceil(frameCount/20);
}
  if (gameState === "end"){
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    ground.velocityX = 0;
  }
    monkey.velocityY = monkey.velocityY + 0.8;
  
  stroke("white")
  textSize(20)
  fill("white")
  text("Score:"+score,500,50)
  
  stroke("black")
  textSize(20)
  fill("black")
  text("Survival Time:"+survivalTime,50,50);
  
  drawSprites();
}
function spawnBanana(){
  banana = createSprite(450,230,20,20);
  banana.y = Math.round(random(170,230))
  banana.addImage(bananaImage);
  banana.velocityX = -10;
  banana.scale = 0.1;
  banana.lifetime = 120;
  foodGroup.add(banana);
}
function spawnObstacle(){
  obstacle = createSprite(450,317,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -10;
  obstacle.scale = 0.15;
  obstacle.lifetime = 120;
  obstacleGroup.add(obstacle);
}





