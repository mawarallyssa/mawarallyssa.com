const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

class Bug {
  constructor(_) {
    this.x = 0;
    this.y = 0;
    this.radius = _.radius;
    this.vx = 0;
    this.vy = 0;
    this.mass = 1;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = _.color;
    this.lineWidth = 1;
    this.visible = true;
  }
  render(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);

    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();

    context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

    if (this.lineWidth > 0) context.stroke();
    context.restore();
  }}


function color() {
  return `hsla(${randomNum(360, 1)}, 70%, 60%, 1)`;
}

let dots = [];
let numDots = 200;
let friction = 0.95;
let decay = 0.01;
let decayColor = color;

function randomNum(max, min) {
  return Math.floor(max * Math.random()) + min;
}

function positiveOrNegative(x) {
  return Math.random() < 0.5 ? -x : x;
}

function generate() {
  for (let dot, i = 0; i < numDots; i++) {
    dot = new Bug({ radius: randomNum(6, 2), color: color() });
    dot.x = Math.random() * width;
    dot.y = Math.random() * height;
    dot.vx = 0;
    dot.vy = 0;

    dots.push(dot);
  }
}

function animate(dot) {
  dot.vx += positiveOrNegative(0.5);
  dot.vy += positiveOrNegative(0.5);
  dot.x += dot.vx;
  dot.y += dot.vy;
  dot.vx *= friction;
  dot.vy *= friction;

  if (dot.x > width)
  dot.x = 0;else
  if (dot.x < 0)
  dot.x = width;

  if (dot.y > height)
  dot.y = 0;else
  if (dot.y < 0)
  dot.y = height;

  dot.render(context);
}

generate(

function draw() {
  window.requestAnimationFrame(draw, canvas);

  dots.forEach(animate);
}());

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  dots = [];
  generate();
}, false);