let score = 0;
let scoreInterval = null;

const scoreElement = document.getElementById('score-counter');

export function getScore() {
  return score;
}

function formatScore(value) {
  return value.toString().padStart(2, '0');
}

export function startScore() {
  score = 0;
  scoreElement.style.display = 'block';
  updateScoreDisplay();

  scoreInterval = setInterval(() => {
    score += 1;
    updateScoreDisplay();
  }, 100); // cada décima de segundo
}

export function stopScore() {
  clearInterval(scoreInterval);
  scoreInterval = null;

  saveScores();
  updateStoredScoresUI();
}

export function resetScore() {
  score = 0;
  updateScoreDisplay();
}

function updateScoreDisplay() {
  scoreElement.textContent = formatScore(score);
}

function saveScores() {
  localStorage.setItem('lastScore', score);

  const highScore = parseInt(localStorage.getItem('highScore') || 0);
  if (score > highScore) {
    localStorage.setItem('highScore', score);
  }
}

export function updateStoredScoresUI() {
  const lastScore = localStorage.getItem('lastScore') || 0;
  const highScore = localStorage.getItem('highScore') || 0;

  document.querySelectorAll('.last-score').forEach(el => {
    el.textContent = lastScore;
  });

  document.querySelectorAll('.high-score').forEach(el => {
    el.textContent = highScore;
  });
}
