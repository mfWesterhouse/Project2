var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, windowHeight);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading = createElement("h1");
  scoreboard = createElement("h1");
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes

  scoreboard.html("Score: " + score);
  scoreboard.style('color: red');
  scoreboard.position(width-200,20);

  heading.html("Life: " + life);
  heading.style('color: red');
  heading.position(width-300,20);

  if(gameState===1){
    gun.y=mouseY  

    if(frameCount % 80 === 0){
      drawblueBubble();
    }
    if(frameCount % 100 === 0){
      drawredBubble();
    }

    if(keyDown(32)){
      shootBullet();
    }

    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }
    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    if(blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    if(redBubbleGroup.collide(backBoard)){
      handleGameover(redBubbleGroup);
    }

    drawSprites();
  }

     
}

function shootBullet(){
bullet = createSprite(50,height/2,10,10);
bullet.y = gun.y - 40;
bullet.x = gun.x + 120;
bullet.velocityX = 10;
bullet.addImage("bullet", bulletImg);
bullet.scale = 0.1;
bullet.lifeTime = 400;
bulletGroup.add(bullet);

}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}

function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function handleBubbleCollision(bubbleGroup){
  if (life > 0){
    score = score + 1;
  
    var blast = createSprite(100,100,20,20);
    blast.x = bullet.x;
    blast.y = bullet.y;
    blast.addImage(blastImg);
    blast.scale = 0.1;
    blast.lifetime = 20;

    bulletGroup.destroyEach();
    bubbleGroup.destroyEach();

  }
}

function handleGameover(bubbleGroup){

  life = life - 1;

  bubbleGroup.destroyEach();

  if(life === 0){
    gameState = 2;
    swal({
      title: `Game Over`,
      text: "Oops you lost the game!",
      text: "Your Score is " + score,
      imageUrl: 
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSized: "100x100",
      confimrButtonText: "Thanks for Playing"
    });
  }
}
