const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let score = 0;

const brickRowCount = 10;
const brickColumnCount = 6;

// instantiate ball props
const ball = {
   x: canvas.width / 2,
   y: canvas.height / 2,
   size: 10, //set
   speed: 5, //set
   dx: 5, //set
   dy: 5 //set
};

// Draw ball
function drawBall() {
   ctx.beginPath();
   ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
   ctx.fillStyle = '#002200';
   ctx.fill();
   ctx.closePath();
}

drawBall();

// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));