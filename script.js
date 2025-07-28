const gameArea = document.getElementById('gameArea');
const instructions = document.getElementById('instructions');

let cameraX = 0;
let cameraY = 0;
let jumpAmplitude = 20;
let jumpSpeed = 0.005;
let jumpTime = 0;

let sensitivity = 0.5; // mouse sensitivity for camera movement

// Pointer Lock setup
gameArea.addEventListener('click', () => {
  gameArea.requestPointerLock();
});

// Track pointer lock state
document.addEventListener('pointerlockchange', () => {
  if (document.pointerLockElement === gameArea) {
    instructions.style.display = 'none';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
  } else {
    instructions.style.display = 'block';
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousedown', onMouseDown);
  }
});

// Mouse move controls camera panning
function onMouseMove(e) {
  cameraX -= e.movementX * sensitivity;
  cameraY -= e.movementY * sensitivity;
  updateCamera();
}

// Left click shoots
function onMouseDown(e) {
  if (e.button === 0) { // left click
    shoot();
  }
}

function updateCamera() {
  // Jump offset with sine wave
  let jumpOffset = Math.sin(jumpTime) * jumpAmplitude;
  gameArea.style.transform = `translate(${cameraX}px, ${cameraY + jumpOffset}px)`;
}

function animate(time) {
  jumpTime += jumpSpeed * 16;
  updateCamera();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Shoot inside the crosshair circle randomly
function shoot() {
  const circleRadius = 30; // crosshair radius

  const angle = Math.random() * 2 * Math.PI;
  const radius = Math.sqrt(Math.random()) * circleRadius;

  const xOffset = radius * Math.cos(angle);
  const yOffset = radius * Math.sin(angle);

  console.log(`Shot fired at offset X:${xOffset.toFixed(2)} Y:${yOffset.toFixed(2)}`);

  showShotHit(xOffset, yOffset);
}

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
