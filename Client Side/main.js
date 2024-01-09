let canvas;
let canvasWidth = 500;
let canvasHeight = 500;
let ctx;
let bottomLine = 0;

// Player
let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 20;

let player = {
  x: canvasWidth / 2 - playerWidth / 2,
  y: canvasHeight - playerHeight - 7.5,
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

let blockArray = [];
let blockWidth = 50;
let blockHeight = 15;
let blockColumn = 8;
let blockRow = 3;
let blockMaxsRow = 10;
let blockCount = 0;

//starting block corners top left
let blockX = 15;
let blockY = 45;

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

  // Create Blocks
  createBlocks();
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
    bottomLine++;
    console.log("Pass the bottom of canvas : ", bottomLine);

    // if (bottomCollision > 3) {
    //   const userConfirm = window.confirm(
    //     "Game Over!, do you want to restart the game?!"
    //   );

    //   if (userConfirm) {
    //     window.location.reload();
    //   }
    // }
  }

  // Check Collision
  if (topCollision(ball, player) || bottomCollision(ball, player)) {
    ball.velocityY *= -1; // flip y
  } else if (leftCollision(ball, player) || rightCollision(ball, player)) {
    ball.velocityX *= -1;
  }

  // Blocks
  ctx.fillStyle = "red";
  for (let i = 0; i < blockArray.length; i++) {
    let block = blockArray[i];
    if (!block.break) {
      if (topCollision(ball, block) || bottomCollision(ball, block)) {
        block.break = true;
        ball.velocityY *= -1;
        blockCount -= 1;
      } else if (leftCollision(ball, block) || rightCollision(ball, block)) {
        block.break = true;
        ball.velocityX *= -1;
        blockCount -= 1;
      }
      // Draw Block
      ctx.fillRect(block.x, block.y, block.width, block.height);
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
    a.y + a.height > b.y // a bottom left corner
  );
};

// Detect top collision
const topCollision = (ball, block) => {
  return detectCollision(ball, block) && ball.y + ball.height >= block.y;
};

const bottomCollision = (ball, block) => {
  return detectCollision(ball, block) && block.y + block.height >= ball.y;
};

const leftCollision = (ball, block) => {
  return detectCollision(ball, block) && ball.x + ball.width >= block.x;
};

const rightCollision = (ball, block) => {
  return detectCollision(ball, block) && block.x + block.width >= ball.x;
};

const createBlocks = () => {
  blockArray = [];
  for (let i = 0; i < blockColumn; i++) {
    for (let j = 0; j < blockRow; j++) {
      let block = {
        x: blockX + i * blockWidth + i * 10, // Multiply 10?
        y: blockY + j * blockHeight + j * 10,
        width: blockWidth,
        height: blockHeight,
        break: false,
      };
      blockArray.push(block);
    }
  }
  blockCount = blockArray.length;
};
