import { initGame, startGame, restartGame } from "./game.js";
import { setupInput } from "./input.js";
import { initAudio, playMenuMusic, playGameMusic } from "./sound.js";

const startScreen = document.getElementById("start-screen");
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const tutorialDialog = document.getElementById("rules-classic-dialog");
const closeTutorialBtn = document.getElementById("close-rules-classic");
const classicModeBtn = document.getElementById("classic-mode-btn");

window.addEventListener("load", () => {
  initAudio();
  playMenuMusic();
});

classicModeBtn.addEventListener("click", () => {
  tutorialDialog.showModal();
  playMenuMusic();
});

closeTutorialBtn.addEventListener("click", () => {
  tutorialDialog.close();
  startScreen.style.display = "none";
  canvas.style.display = "block";
  initGame(ctx);
  startGame();
  playGameMusic();
});

document.getElementById("restart-button").addEventListener("click", () => {
  const dialog = document.getElementById("game-over-dialog");
  dialog.close();
  restartGame();
});

setupInput();

  window.addEventListener('DOMContentLoaded', () => {
    const tooltip = document.getElementById('fullscreen-tooltip');
    tooltip.classList.add('show');
    setTimeout(() => {
      tooltip.classList.remove('show');
    }, 2000);
  });