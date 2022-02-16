const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let score = 0;

const brickRowCount = 8;
const brickColumnCount = 5;

// instantiate ball props
const ball = {
   x: canvas.width / 2,
   y: canvas.height / 2,
   size: 8, //set
   speed: 1, //set
   dx: 5, //set
   dy: 5 //set
};

// instantiate paddle props
const paddle = {
   x: canvas.width / 2 - 40,
   y: canvas.height -20,
   w: 100, //set
   h: 15, //set
   speed: 6, //set
   dx: 0
}

// instantiate brick props
const brickWall = {
   w: 60,
   h: 15,
   padding: 10,
   offsetX: 25, //set
   offsetY: 60, //set
   visible: true, //set
}

const bricks = [];
for(let i = 0; i < brickRowCount; i++) {
   bricks[i] = [];
   for(let j = 0; j < brickColumnCount; j++) {
      const x = i * (brickWall.w + brickWall.padding) + brickWall.offsetX;
      const y = j * (brickWall.h + brickWall.padding) + brickWall.offsetY;
      bricks[i][j] = { x, y, ...brickWall };
   }
}

// Draw ball
function drawBall() {
   ctx.beginPath();
   ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
   ctx.fillStyle = '#002200';
   ctx.fill();
   ctx.closePath();
}

// Draw paddle
function drawPaddle() {
   ctx.beginPath();
   ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
   ctx.fillStyle = '#002200';
   ctx.fill();
   ctx.closePath();
}

//  draw bricks
function drawBricks() {
   bricks.forEach(column => {
      column.forEach(brick => {
         ctx.beginPath();
         ctx.rect(brick.x, brick.y, brick.w, brick.h);
         ctx.fillStyle = brick.visible ? '#002200' : 'transparent';
         ctx.fill();
         ctx.closePath();
      })
   })
}

// Score
function drawScore() {
   ctx.font = '20px Arial';
   ctx.fillText(`Score: ${score}`, canvas.width - 100, 35);
}

// activate paddle movement
function movePaddle() {
   paddle.x += paddle.dx;

   // wall detection
   if (paddle.x + paddle.w > canvas.width) {
      paddle.x = canvas.width - paddle.w;
   }
   if (paddle.x < 0) {
      paddle.x = 0;
   }
}

// activate Ball movement
function moveBall() {
   ball.x += ball.dx;
   ball.y += ball.dy;

   // detect wall collision (left/right)
   if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
      ball.dx *= -1; 
   }
   // detect wall collision (up/down)
   if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
      ball.dy *= -1;
   }
   // paddle collision
   if (
      ball.y + ball.size > paddle.y &&
      ball.x + ball.size > paddle.x &&
      ball.x + ball.size < paddle.x + paddle.w
   ) {
      ball.dy = -ball.speed;
   }
   // bricks collision
   bricks.forEach(column => {
      column.forEach(brick => {
         if (brick.visible) {
            if (
               ball.x - ball.size > brick.x && // left brick check
               ball.x + ball.size < brick.x + brick.w && // right brick check
               ball.y + ball.size > brick.y && // up brick check
               ball.y - ball.size < brick.y + brick.h // down brick check
            ) {
               ball.dy *= -1;
               brick.visible = false;
               countScore();
            }
         }
      });
   });
   // hit button - lose ball
   if (ball.y + ball.size > canvas.height) {
      showAllBricks();
      score = 0;
   }
}

// Score count
function countScore() {
   score++;

   if (score % (brickRowCount * brickRowCount) === 0) {
      showAllBricks();
   }
}

// make bricks appear
function showAllBricks() {
   bricks.forEach(column => {
      column.forEach(brick => (brick.visible = true));
   });
}

// group
function draw() {
   // clear canvas to avoid movement errors
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   drawBall();
   drawPaddle();
   drawScore();
   drawBricks();
}

// add animation
function update() {
   movePaddle();
   moveBall();
   // draw entire game
   draw();
   requestAnimationFrame(update);
}

update();

// keyboard event
function keyDown(e) {
   if (e.key === 'Right' || e.key === 'ArrowRight') {  
      paddle.dx = paddle.speed;
   } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      paddle.dx = -paddle.speed;
   }
}

// keyboard event
function keyUp(e) {
   if (
      e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft'
   ) {
      paddle.dx = 0;
   }
}

// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));