let canvas;
let canvasWidth = 500;
let canvasHeight = 500;
let ctx;

let playerWidth = 80;
let playerHeight = 10;

let player = {
  x: canvasWidth / 2 - playerWidth / 2,
  y: canvasHeight - playerHeight - 5,
  width: playerWidth,
  height: playerHeight,
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
};
