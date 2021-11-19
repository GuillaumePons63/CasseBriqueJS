let canvas = document.getElementById("myCanvas");
let scoreDisplay = document.getElementById("score");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2 ;
let dy = -2;
let ballRadius = 10;
let ballColor =  '#0080ff';
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
let score = 0 ;

scoreDisplay.textContent = score;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0000DD";
  ctx.fill();
  ctx.closePath();
}

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
  }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    
    x += dx;
    y += dy;
    if(rightPressed) {
      paddleX += 5;
      if (paddleX + paddleWidth > canvas.width){
        paddleX = canvas.width - paddleWidth;
      }
    }
    if(leftPressed) {
      paddleX -= 5;
      if (paddleX < 0){
        paddleX = 0;
      }
    }
    if(y  < ballRadius) {
      dy = -dy;      
    }
    if (y  > canvas.height - ballRadius - paddleHeight) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        dx += 0.5;
        dy += 0.5;
        dy = -dy;
        score += 1;
        scoreDisplay.textContent = score;
        
      } else if (y  > canvas.height - ballRadius) {
      alert("game over");
      document.location.reload();
      clearInterval(interval);
      }
    }
    if(x  > canvas.width - ballRadius || x < ballRadius) {
      dx = -dx;
      
    }
}

let interval = setInterval(draw, 10);