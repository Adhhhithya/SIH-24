// script.js
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;

// Handle mouse
const mouse = {
  x: null,
  y: null,
};

// Create particle instances when the mouse moves
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;

  for (let i = 0; i < 10; i++) {  // Increase particle creation for a more gas-like effect
    const size = (Math.random() * 10) +2;  // Larger particles
    const x = mouse.x + ((Math.random() * 50) - 25);  // More spread
    const y = mouse.y + ((Math.random() * 50) - 25);
    const color = 'rgba(255, 255, 255, 0.1)';  // Light and transparent particles
    const velocityX = (Math.random() * 2) - 1;  // Horizontal movement
    const velocityY = (Math.random() * 2) - 1;  // Vertical movement
    particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
  }
});

// Particle class
class Particle {
  constructor(x, y, size, color, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.velocityX;  // Move horizontally
    this.y += this.velocityY;  // Move vertically
    this.size -= 0.05;  // Gradually shrink

    if (this.size < 0) {
      this.size = 0;
    }

    // Bounce off edges to keep the particles on the screen
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.velocityX *= -1;
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.velocityY *= -1;
    }
  }
}

// Animate particles
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw and update particles
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    // Remove particles if they are too small
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

animate();

// Resize canvas on window resize
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
});
});