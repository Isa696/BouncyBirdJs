import {
  createBird,
  updateBird,
  drawBird,
  resetBird,
  isBirdDead,
} from "./bird.js";
import {
  createPipes,
  updatePipes,
  drawPipes,
  resetPipes,
  getPipeSpeed,
} from "./pipe.js";
import {
  startScore,
  stopScore,
  resetScore,
  updateStoredScoresUI,
} from "./score.js";
import { playRandomDeathSound } from "./sound.js";
import {
  showSeedsCounter,
  hideSeedsCounter,
  updateSeeds,
  drawSeeds,
  resetCollectedSeeds,
  resetSeeds,
  updateSeedsCounterDisplay,
} from "./seeds.js";

let ctx;
let animationId;

updateStoredScoresUI();
export function initGame(context) {
  ctx = context;
  createBird();
  createPipes();
}

export function startGame() {
  startScore();
  showSeedsCounter();
  function gameLoop() {
    ctx.clearRect(0, 0, 320, 512);
    updateBird();
    updatePipes();
    updateSeeds(getPipeSpeed());
    drawPipes(ctx);
    drawSeeds(ctx);
    drawBird(ctx);

    if (isBirdDead()) {
      playRandomDeathSound();
      cancelAnimationFrame(animationId);
      stopScore();
      setTimeout(() => {
        const dialog = document.getElementById("game-over-dialog");
        dialog.showModal();
      }, 100);
      return;
    }

    animationId = requestAnimationFrame(gameLoop);
  }

  animationId = requestAnimationFrame(gameLoop);
}

export function restartGame() {
  resetBird();
  resetPipes();
  resetScore();
  hideSeedsCounter();
  resetCollectedSeeds();
  updateSeedsCounterDisplay();
  resetSeeds();
  startGame();
}
