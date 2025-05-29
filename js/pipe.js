import { flap } from './bird.js';
import { getScore } from './score.js';
import { playBounceSound } from './sound.js';
import { spawnSeed } from './seeds.js';

let pipes = [];
let pipeGap = 200;
const pipeWidth = 100;
const pipeImage = new Image();
pipeImage.src = './assets/pipe.png';

const flippedPipeImage = document.createElement('canvas');
const flipCtx = flippedPipeImage.getContext('2d');

pipeImage.onload = () => {
  // Tamaño del recorte original
  const sw = 136;
  const sh = 258;

  flippedPipeImage.width = sw;
  flippedPipeImage.height = sh;

  // Invertir verticalmente
  flipCtx.scale(1, -1);
  flipCtx.drawImage(pipeImage, 29, 170, sw, sh, 0, -sh, sw, sh);
};

// Función para generar una altura aleatoria para los tubos
function randomHeight() {
  return Math.floor(Math.random() * 200) + 50;
}

export function createPipes() {
  pipes = [
    { x: 300, height: randomHeight() }
  ];
}

export function getPipeSpeed() {
  const baseSpeed = 2;
  return Math.min(baseSpeed + getScore() / 250, 10);
}
// Aumentar la velocidad de los tubos con el tiempo
export function updatePipes() {
    if (getScore() >= 500) {
  pipeGap = 175;
}
    if (getScore() >= 1000) {
  pipeGap = 150;
}
    if (getScore() >= 1500) {
  pipeGap = 100;
}
    if (getScore() >= 1500) {
  pipeGap = 80;
}

for (let pipe of pipes) {
  pipe.x -= getPipeSpeed();
}

const horizontalPipeSpacing = 300;

if (pipes[pipes.length - 1].x < 150) {
  const newX = pipes[pipes.length - 1].x + horizontalPipeSpacing;
  const newHeight = randomHeight();

  pipes.push({ x: newX, height: newHeight });

  if (pipes.length >= 2) {
    const prevPipe = pipes[pipes.length - 2];
    spawnSeed(prevPipe.x, prevPipe.height, pipeGap, pipeWidth, horizontalPipeSpacing);
  }
}


  if (pipes[0].x + pipeWidth < 0) {
    pipes.shift();
  }

const bird = window.bird;

for (let pipe of pipes) {
  const pipeLeft = pipe.x;
  const pipeRight = pipe.x + pipeWidth;

  const birdLeft = bird.x;
  const birdRight = bird.x + bird.width;
  const birdTop = bird.y;
  const birdBottom = bird.y + bird.height;

  const collidesX = birdRight > pipeLeft && birdLeft < pipeRight;

  if (collidesX) {
    const pipeCenter = pipeLeft + pipeWidth / 2;
    const allowedReboundWidth = 100;
    const birdCenter = birdLeft + bird.width / 2;
    const withinReboundZone = Math.abs(birdCenter - pipeCenter) < allowedReboundWidth / 2;

    const hitsTop = birdTop < pipe.height;
    const hitsBottom = birdBottom > pipe.height + pipeGap;

    if (withinReboundZone) {
      if (hitsTop) {
        flap(-0.5);
        playBounceSound(0.4, 1);
        continue;
      }

      if (hitsBottom) {
        flap(1);
        playBounceSound(0.2, 0.5);
        continue;
      }
    }

    // Cualquier otra colisión es muerte
    if (hitsTop || hitsBottom) {
      bird.alive = false;
    }
  }
}


}

export function drawPipes(ctx) {
  for (let pipe of pipes) {
    ctx.drawImage(pipeImage, 29, 170, 136, 258, pipe.x, pipe.height + pipeGap, pipeWidth, 320); // bottom pipe
    ctx.drawImage(flippedPipeImage, pipe.x, pipe.height - 320, pipeWidth, 320);
  }
}

export function resetPipes() {
  createPipes();
  pipeGap = 200;
}
