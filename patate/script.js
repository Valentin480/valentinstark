const btn = document.getElementById('magicBtn');
const msg = document.getElementById('message');
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

const messages = [
  "💥 Boum ! T'es choqué, hein ?",
  "😂 Patate powa !",
  "🚀 Valentin Stark, c'est la fusée des sites !",
  "🔥 Ce site va faire exploser ton cerveau !",
  "🥔 Patate party activée !",
  "😂Tu veux encore ? T'es officielement accro à la patate🥔",
  "Une patate par jour éloigne la tristesse pour toujours🥔",
  "⚠️Attention: contenu ultra croustillant.",
  "🥕Les carotte sont jalouses.",
  "🤣On est clairement sur une dinguerie là"
];

// Resize canvas
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Particules patates flottantes
class Potato {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 20 + Math.random() * 30;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.angle = Math.random() * 2 * Math.PI;
    this.angleSpeed = (Math.random() - 0.5) * 0.01;
    this.image = new Image();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.angleSpeed;
    if(this.x > canvas.width + this.size) this.x = -this.size;
    if(this.x < -this.size) this.x = canvas.width + this.size;
    if(this.y > canvas.height + this.size) this.y = -this.size;
    if(this.y < -this.size) this.y = canvas.height + this.size;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, -this.size/2, -this.size/2, this.size, this.size);
    ctx.restore();
  }
}

const potatoes = [];
for(let i = 0; i < 30; i++) {
  potatoes.push(new Potato());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  potatoes.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

btn.addEventListener('click', () => {
  // Message aléatoire
  const randomIndex = Math.floor(Math.random() * messages.length);
  msg.textContent = messages[randomIndex];
  msg.style.opacity = '1';
  // Effet clignotant
  setTimeout(() => {
    msg.style.opacity = '0.7';
  }, 1500);

  // Easter egg: pluie d’emojis patate
  createPotatoRain();
});

// Pluie d'emojis patates
function createPotatoRain() {
  const count = 30;
  for(let i=0; i<count; i++) {
    const span = document.createElement('span');
    span.textContent = '🥔';
    span.style.position = 'fixed';
    span.style.left = Math.random() * window.innerWidth + 'px';
    span.style.top = '-30px';
    span.style.fontSize = (10 + Math.random()*30) + 'px';
    span.style.opacity = 0.8;
    span.style.pointerEvents = 'none';
    span.style.transition = 'transform 3s ease, opacity 3s ease';
    document.body.appendChild(span);
    setTimeout(() => {
      span.style.transform = `translateY(${window.innerHeight + 50}px) rotate(${Math.random()*360}deg)`;
      span.style.opacity = 0;
    }, 50);
    setTimeout(() => {
      document.body.removeChild(span);
    }, 3050);
  }
}
