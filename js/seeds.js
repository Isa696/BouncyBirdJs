import { playSeedFadeOutSound } from './sound.js';

const seedsCounter  = document.getElementById('seeds-counter');
let collectedSeeds = 0;

export function getCollectedSeeds() {
  return collectedSeeds;
}

export function resetCollectedSeeds() {
  collectedSeeds = 0;
}


export function showSeedsCounter() {
  seedsCounter .style.display = 'block';
}
export function hideSeedsCounter() {
  seedsCounter .style.display = 'none';
}

export function updateSeedsCounterDisplay() {
  seedsCounter.childNodes[0].textContent = collectedSeeds.toString().padStart(2, '0');
}

const seeds = [];
const seedFrames = [];
const frameCount = 3;
let currentSeedFrame = 0;
let seedFrameCounter = 0;
const seedFrameDelay = 10; // número de frames entre cada cambio (ajustá si va muy rápido o lento)

const fadeOutFrames = [];
for (let i = 0; i <= 3; i++) {
  const frame = new Image();
  frame.src = `./assets/seed/0${i}_seed-fade-out.png`;
  fadeOutFrames.push(frame);
}



for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = `./assets/seed/0${i}_seed.png`;
  seedFrames.push(img);
}


export function resetSeeds() {
  seeds.length = 0;
}

export function spawnSeed(x, pipeTopHeight, pipeGap, pipeWidth, horizontalPipeSpacing) {
// Evitar el centro del gap
const totalHeight = 512;
const safeMargin = 10;
const seedX = x + (pipeWidth / 2) + (horizontalPipeSpacing / 2);

let y;
do {
  y = Math.floor(Math.random() * (totalHeight - 60)) + safeMargin;
} while (y > pipeTopHeight && y < pipeTopHeight + pipeGap );


  seeds.push({ x: seedX, y, width: 40, height: 40, collected: false });
}


export function updateSeeds(speed) {
for (let seed of seeds) {
  seed.x -= speed;

  if (seed.collected && seed.fadeOutFrame !== undefined) {
    seed.fadeOutTimer++;

    if (seed.fadeOutTimer % 5 === 0) { // ajustar velocidad
      seed.fadeOutFrame++;
      if (seed.fadeOutFrame >= fadeOutFrames.length) {
        seed.toRemove = true; // marcar para eliminar
      }
    }
  }
}


  // Actualizar animación
  seedFrameCounter++;
  if (seedFrameCounter >= seedFrameDelay) {
    seedFrameCounter = 0;
    currentSeedFrame = (currentSeedFrame + 1) % seedFrames.length;
  }

  // Eliminar fuera de pantalla
  while (seeds.length > 0 && seeds[0].x + 20 < 0) {
    seeds.shift();
  }

  // 🔍 Verificar colisiones con el pájaro
  const bird = window.bird;
  if (bird && bird.alive) {
    for (let seed of seeds) {
      if (!seed.collected &&
        bird.x < seed.x + seed.width &&
        bird.x + bird.width > seed.x &&
        bird.y < seed.y + seed.height &&
        bird.y + bird.height > seed.y
      ) {
        seed.collected = true;
        collectedSeeds++;
        seed.fadeOutFrame = 0;
        seed.fadeOutTimer = 0;
        updateSeedsCounterDisplay();
        incrementStoredSeeds();

        // Opcional: sonido
        playSeedFadeOutSound();
      }
    }
  }
    // 🔚 Finalmente, eliminar semillas ya animadas
  for (let i = seeds.length - 1; i >= 0; i--) {
    if (seeds[i].toRemove) {
      seeds.splice(i, 1);
    }
  }
}


export function drawSeeds(ctx) {
  for (let seed of seeds) {
    if (seed.collected && seed.fadeOutFrame !== undefined) {
      if (seed.fadeOutFrame < fadeOutFrames.length) {
        ctx.drawImage(fadeOutFrames[seed.fadeOutFrame], seed.x, seed.y, seed.width, seed.height);
      }
    } else if (!seed.collected) {
      ctx.drawImage(seedFrames[currentSeedFrame], seed.x, seed.y, seed.width, seed.height);
    }
  }
}

function incrementStoredSeeds() {
  const current = parseInt(localStorage.getItem('totalSeeds') || '0');
  localStorage.setItem('totalSeeds', current + 1);
}
export const seedsTotal = parseInt(localStorage.getItem('totalSeeds') || '0');