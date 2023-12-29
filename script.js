var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Load the bird image
var birdImg = new Image();
birdImg.src = "bird.png"; // Make sure the path to your image is correct

// Bird
var bird = {
  x: 75,
  y: 75,
  dy: 1, // Adjust this value to make the bird fall slower
  width: 30, // You can adjust the width and height as needed
  height: 30
};

// Pipes
var pipes = [];
pipes[0] = {
  x: canvas.width,
  y: 0,
  width: 50,
  gap: 175, // Increased gap size
  height: Math.floor(Math.random() * (canvas.height - 250)) + 100 // Random height of the pipes
};

// Score
var score = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird
  ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  // Pipes
  for(var i = 0; i < pipes.length; i++) {
    var pipe = pipes[i];

    // Top pipe
    ctx.beginPath();
    ctx.rect(pipe.x, 0, pipe.width, pipe.height);
    ctx.fillStyle = "#008000";
    ctx.fill();
    ctx.closePath();

    // Bottom pipe
    ctx.beginPath();
    ctx.rect(pipe.x, pipe.height + pipe.gap, pipe.width, canvas.height - pipe.height - pipe.gap);
    ctx.fillStyle = "#008000";
    ctx.fill();
    ctx.closePath();

    pipe.x--;

    if(pipe.x == 125) {
      pipes.push({
        x: canvas.width,
        y: 0,
        width: 50,
        gap: 150, // Increased gap size
        height: Math.floor(Math.random() * (canvas.height - 250)) + 100 // Random height of the pipes
      });
    }

    // Collision detection
    if((bird.x < pipe.x + pipe.width &&
        bird.x + bird.width > pipe.x &&
        bird.y < pipe.height) ||
        (bird.x < pipe.x + pipe.width &&
        bird.x + bird.width > pipe.x &&
        bird.y + bird.height > pipe.height + pipe.gap)) {
         alert("Game Over! Your score is: " + score);
         document.location.reload();
         clearInterval(interval);
     }

    if(pipe.x == 0) {
      pipes.shift();
      score++; // Increment score when bird passes a pipe
    }
  }

  // Display score
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Score: " + score, 10, 20);

  bird.y += bird.dy;

  // Add collision detection for the bird and the canvas boundaries
  if(bird.y + bird.height > canvas.height) {
    bird.y = canvas.height - bird.height;
    bird.dy = 0;
  }

  if(bird.y < 0) {
    bird.y = 0;
  }
}

var interval = setInterval(draw, 10);

window.addEventListener('mousedown', function(e) {
  bird.y -= 75; // The bird will go up 100px when you click
  bird.dy = 1; // Reset the falling speed after the bird jumps
});

