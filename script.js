const gameArea = document.getElementById('gameArea');
const shootBtn = document.getElementById('shootBtn');

let cameraX = 0;
let cameraY = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let camStartX = 0;
let camStartY = 0;

let jumpAmplitude = 20; // pixels
let jumpSpeed = 0.005; // how fast it jumps
let jumpTime = 0;

// Drag camera to move around virtual world
document.body.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  camStartX = cameraX;
  camStartY = cameraY;
});

document.body.addEventListener('mouseup', () => {
  isDragging = false;
});

document.body.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  let deltaX = e.clientX - dragStartX;
  let deltaY = e.clientY - dragStartY;
  cameraX = camStartX + deltaX;
  cameraY = camStartY + deltaY;
  updateCamera();
});

// Animate jump effect & update camera position
function updateCamera() {
  // Jump offset using sine wave
  let jumpOffset = Math.sin(jumpTime) * jumpAmplitude;
  gameArea.style.transform = `translate(${cameraX}px, ${cameraY + jumpOffset}px)`;
}

function animate(time) {
  jumpTime += jumpSpeed * 16; // speed based on frame time
  updateCamera();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Shoot randomly inside the crosshair circle
shootBtn.onclick = () => {
  const circleRadius = 30; // half of crosshair width
  // Generate random point inside circle using polar coordinates
  const angle = Math.random() * 2 * Math.PI;
  const radius = Math.sqrt(Math.random()) * circleRadius; // sqrt for uniform distribution
  const xOffset = radius * Math.cos(angle);
  const yOffset = radius * Math.sin(angle);

  // This simulates where the shot lands relative to center
  console.log(`Shot fired at offset X:${xOffset.toFixed(2)} Y:${yOffset.toFixed(2)}`);

  // You can extend this by showing a bullet or hit effect at that position relative to screen center
  showShotHit(xOffset, yOffset);
};

function showShotHit(x, y) {
  const hit = document.createElement('div');
  hit.style.position = 'fixed';
  hit.style.left = `calc(50% + ${x}px)`;
  hit.style.top = `calc(50% + ${y}px)`;
  hit.style.width = '8px';
  hit.style.height = '8px';
  hit.style.backgroundColor = 'yellow';
  hit.style.borderRadius = '50%';
  hit.style.pointerEvents = 'none';
  hit.style.boxShadow = '0 0 8px 4px yellow';

  document.body.appendChild(hit);

  setTimeout(() => {
    hit.remove();
  }, 400);
}
