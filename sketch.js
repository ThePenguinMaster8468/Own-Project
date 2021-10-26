var score =0;
var gun,bullet;
var target1,target2,target3;
var targetimg
var player;
var database, gameState = 0;
var form, player, playerCount;

var gunImg,bulletImg,backBoardImg;

var wall1,wall2;

var score=0;
var gameState=1

var bullets =20;

var board,boardImg;
var board2

function preload(){
  targetimg = loadImage("board.png");

  boardImg = loadImage("target.png");

  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")

  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);
  database = firebase.database();

  wall1 = createSprite(400,0,800,10);
  wall2 = createSprite(400,800,800,10);

  board = createSprite(620,400,30,30);
  board.addImage(boardImg);
  board.scale = 0.2;
  board.velocityY=25;

  board2 = createSprite(300,400,30,30);
  board2.addImage(boardImg);
  board2.scale = 0.2;
  board2.velocityY=20;

  target1 = createSprite(700,400,30,30);
  target1.addImage(targetimg);
  target1.scale = 0.01;
  target1.velocityY=11;

  target2 = createSprite(550,400,30,30);
  target2.addImage(targetimg);
  target2.scale = 0.012;
  target2.velocityY=8;

  target3 = createSprite(400,400,30,30);
  target3.addImage(targetimg);
  target3.scale = 0.015;
  target3.velocityY=5;
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(backBoardImg);

  target1.bounceOff(wall1);
  target1.bounceOff(wall2);

  target2.bounceOff(wall1);
  target2.bounceOff(wall2);

  target3.bounceOff(wall1);
  target3.bounceOff(wall2);

  board.bounceOff(wall1);
  board.bounceOff(wall2);

  board2.bounceOff(wall1);
  board2.bounceOff(wall2);

  heading.style('color:blue'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:blue'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  

    if(keyDown("space")){
      if(bullets>0 ){
       shootBullet();
        bullets = bullets-1;
      }
    }
    if(keyDown("r")){
      bullets = 20;
    }

    if(bulletGroup.isTouching(target1)){
      score = score+5
      bulletGroup.destroyEach();
    }
    if(bulletGroup.isTouching(target2)){
      score = score+3
      bulletGroup.destroyEach();
    }
    if(bulletGroup.isTouching(target3)){
      score = score+1
      bulletGroup.destroyEach();
    }

    if(bulletGroup.isTouching(board)){
      handleGameover();
      bulletGroup.destroyEach();
      gameState=0;
    }
    if(bulletGroup.isTouching(board2)){
      handleGameover();
      bulletGroup.destroyEach();
      gameState=0;
    }
    if(gameState===0){
      target1.velocityY=0;
      target2.velocityY=0;
      target3.velocityY=0;
      board.velocityY=0;
      board2.velocityY=0;
    }
  }
  
    drawSprites();

    fill("blue");
    textSize(30);
    text("bullets: " + bullets,40,70);
    text("press r to reload",40,100);
    text("Don't Hit the White Targets!",40,130);  
  
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 20
  bulletGroup.add(bullet);
}

    function handleGameover(){
      swal({
        title: `Game Over
        Your Score is ` + score,
        text: "Thanks For Playing!",
        imageUrl:
          "https://th.bing.com/th/id/R.1b933733a87e850ff5681b8b5fa5e83b?rik=Pq67Pyk1LeN40A&riu=http%3a%2f%2fclipartmag.com%2fimages%2fsad-face-crying-33.png&ehk=xG9Bxy8oXBzm0Kdc0KovoDXUfStXzj40Y5rSBlRynMc%3d&risl=&pid=ImgRaw&r=0",
        imageSize: "100x100",
        confirmButtonText: "Try Again!"
      },
      function(isConfirm){
        if(isConfirm){
          location.reload();
        }
      })
    }
  
