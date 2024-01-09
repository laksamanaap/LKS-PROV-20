let prabowo = document.getElementById("game-img");
prabowo.style.display = "none ";

let soundPlayed = false;
let canvas;
let canvasWidth = 750;
let canvasHeight = 600;
let ctx;
let bottomLine = 0;

// Player
let playerWidth = 100;
let playerHeight = 10;
let playerVelocityX = 20;

let player = {
  x: canvasWidth / 2 - playerWidth / 2,
  y: canvasHeight - playerHeight - 15,
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

let balls = [];

let blockArray = [];
let blockColorArray = ["red", "yellow", "green"];
let blockWidth = 30;
let blockHeight = 25;
let blockColumn = 15;
let blockRow = 6;
let blockCount = 0;

let blockHitTwice = 0;
let blockHitThird = 0;

// starting block corners top left
let blockX = 15;
let blockY = 45;

// score
let score = 0;
console.log(score);

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

  // Draw Each Ball and Update Movement
  balls.forEach((ball) => {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (ball.y <= 0 || ball.y + ball.height >= canvasHeight) {
      ball.velocityY *= -1;
    }

    if (ball.x <= 0 || ball.x + ball.width >= canvasWidth) {
      ball.velocityX *= -1;
    }

    if (topCollision(ball, player) || bottomCollision(ball, player)) {
      ball.velocityY *= -1;
    } else if (leftCollision(ball, player) || rightCollision(ball, player)) {
      ball.velocityX *= -1;
    }

    for (let j = 0; j < blockArray.length; j++) {
      let block = blockArray[j];
      if (!block.break) {
        let hitTopOrBottom =
          topCollision(ball, block) || bottomCollision(ball, block);
        let hitLeftOrRight =
          leftCollision(ball, block) || rightCollision(ball, block);

        if (hitTopOrBottom || hitLeftOrRight) {
          if (block.strength === 1) {
            // Red brick
            block.break = true;
            blockCount -= 1;
            score += 1;
          } else if (block.strength === 2) {
            // Yellow brick
            block.color = "yellow";
            block.strength -= 1;
            score += 2;
          } else if (block.strength === 3) {
            // Green Brick
            block.strength -= 1;
            score += 3;
            block.color = "green";
          }

          ball.velocityY *= hitTopOrBottom ? -1 : 1;
          ball.velocityX *= hitLeftOrRight ? -1 : 1;
        }
      }
    }

    // Draw each ball
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.width / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  });

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
      let hitTopOrBottom =
        topCollision(ball, block) || bottomCollision(ball, block);
      let hitLeftOrRight =
        leftCollision(ball, block) || rightCollision(ball, block);

      if (hitTopOrBottom || hitLeftOrRight) {
        if (block.strength === 1) {
          // Red brick
          block.break = true;
          createNewBalls(ball.x, ball.y);
          blockCount -= 1;
          score += 1;
        } else if (block.strength === 2) {
          // Yellow brick
          block.color = "yellow";
          block.strength -= 1;
          blockCount -= 1;
          score += 2;
        } else if (block.strength === 3) {
          // Green Brick
          block.strength -= 1;
          score += 3;
          blockCount -= 1;
          block.color = "green";
        }

        ball.velocityY *= hitTopOrBottom ? -1 : 1;
        ball.velocityX *= hitLeftOrRight ? -1 : 1;
      }

      // Draw Block
      ctx.fillStyle = block.color;
      ctx.fillRect(block.x, block.y, block.width, block.height);
    }
  }

  // Display the score on the canvas
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 30);
};

// Create new ball
const createNewBalls = (x, y) => {
  // Show Audio and prabowo only once
  if (!soundPlayed) {
    const audio = new Audio();
    audio.src = "chipichipi.mp3";
    audio.loop = true; // Set loop property to true
    audio.play();
    prabowo.style.display = "block";
    soundPlayed = true;
  }

  for (let i = 0; i < 2; i++) {
    let newBall = {
      x: Math.random() * x, // random x position within canvas width
      y: Math.random() * y, // random y position within canvas height
      width: ballWidth,
      height: ballHeight,
      velocityX: ballVelocityX,
      velocityY: -ballVelocityY,
    };

    balls.push(newBall);
    console.log(balls);
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
      let strength = Math.floor(Math.random() * 3) + 1;
      let color = strength === 1 ? "red" : strength === 2 ? "yellow" : "green";

      let block = {
        x: blockX + i * blockWidth + i * 19,
        y: blockY + j * blockHeight + j * 19,
        width: blockWidth,
        height: blockHeight,
        break: false,
        color: color,
        strength: strength,
      };

      blockArray.push(block);
    }
  }
  blockCount = blockArray.length;
};
