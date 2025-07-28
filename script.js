let score = 0;
let timeLeft = 30;
let timer;
let gameInterval;

const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");

startBtn.onclick = () => {
  startBtn.disabled = true;
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  gameArea.innerHTML = "";

  gameInterval = setInterval(spawnTarget, 700);
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      clearInterval(gameInterval);
      gameArea.innerHTML = "";
      alert("Time's up! Your score: " + score);
      startBtn.disabled = false;
    }
  }, 1000);
};

function spawnTarget() {
  const target = document.createElement("div");
  target.classList.add("target");

  const x = Math.random() * (gameArea.clientWidth - 30);
  const y = Math.random() * (gameArea.clientHeight - 30);
  target.style.left = x + "px";
  target.style.top = y + "px";

  target.onclick = () => {
    score++;
    scoreDisplay.textContent = score;
    gameArea.removeChild(target);
  };

  gameArea.appendChild(target);

  setTimeout(() => {
    if (gameArea.contains(target)) {
      gameArea.removeChild(target);
    }
  }, 1000); // Remove after 1 second if not clicked
}
