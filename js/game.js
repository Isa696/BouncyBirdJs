import {
  createBird,
  updateBird,
  drawBird,
  resetBird,
  isBirdDead,
} from "./bird.js";
import { createPipes, updatePipes, drawPipes, resetPipes } from "./pipe.js";
import { startScore, stopScore, resetScore, updateStoredScoresUI } from "./score.js";
import { playRandomDeathSound } from './sound.js';


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
  function gameLoop() {
    ctx.clearRect(0, 0, 320, 512);
    updateBird();
    updatePipes();
    drawPipes(ctx);
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
  startGame();
  resetScore();
}
