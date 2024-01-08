let canvas;
let canvasWidth = 500;
let canvasHeight = 500;
let ctx;
let bottomCollision = 0;

// Player
let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 15;

let player = {
  x: canvasWidth / 2 - playerWidth / 2,
  y: canvasHeight - playerHeight - 5,
  width: playerWidth,
  height: playerHeight,
  velocityX: playerVelocityX,
};

// Ball
let ballWidth = 12;
let ballHeight = 12;
let ballVelocityX = 3;
let ballVelocityY = 2;

let ball = {
  x: canvasWidth / 2,
  y: canvasHeight / 2,
  width: ballWidth,
  height: ballHeight,
  velocityX: ballVelocityX,
  velocityY: ballVelocityY,
};

// When windown onload
window.onload = function () {
  canvas = document.getElementById("game-board");
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;
  ctx = canvas.getContext("2d");

  // Initial player
  ctx.fillStyle = "yellow";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  requestAnimationFrame(update);
  document.addEventListener("keydown", movePlayer);
};

// Update game loop
const update = () => {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "yellow";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw ball
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.width / 2, 0, 2 * Math.PI);
  ctx.fill();

  // Update ball position
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // If the ball equal less to 0
  if (ball.y <= 0) {
    ball.velocityY *= -1;
  } else if (ball.x <= 0 || ball.x + ball.width >= canvasWidth) {
    // If the ball greater equals to canvas width
    ball.velocityX *= -1;
  } else if (ball.y + ball.height >= canvasHeight) {
    // If the ball through the bottom of canvas
    ball.velocityY *= -1;
    bottomCollision++;
    console.log("Pass the bottom of canvas : ", bottomCollision);

    if (bottomCollision > 3) {
      const userConfirm = window.confirm(
        "Game Over!, do you want to restart the game?!"
      );

      if (userConfirm) {
        window.location.reload();
      }
    }
  }
};

// Out of game-board
const outOfBoard = (xPosition) => {
  return xPosition < 0 || xPosition + playerWidth > canvasWidth;
};

// Move plater function
const movePlayer = (e) => {
  if (e.code === "ArrowLeft") {
    // player.x -= playerVelocityX;
    let nextPlayerX = player.x - player.velocityX;
    if (!outOfBoard(nextPlayerX)) {
      player.x -= playerVelocityX;
    }
  }

  if (e.code === "ArrowRight") {
    // player.x += playerVelocityX;
    let nextPlayerX = player.x + player.velocityX;
    if (!outOfBoard(nextPlayerX)) {
      player.x += playerVelocityX;
    }
  }
};

// Detect collision
const detectCollision = (a, b) => {
  return (
    a.x < b.x + b.width && // a top left corner
    a.x + a.width > b.x && // a top right corner
    a.y < b.y + b.height && // a top left corner
    a.y + a.height > b.y
  ); // a bottom left corner
};

// Detect top collision
const topCollision = (ball, block) => {
  return detectCollision(ball, block) && ball.y + ball.height >= block.y;
};
