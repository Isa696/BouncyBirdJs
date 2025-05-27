import { playFlapSound } from './sound.js';
import { birds } from './shop.js';

let bird;
let gravity = 0.5;
let lift = -8;

export function createBird() {
    const selectedIndex = parseInt(localStorage.getItem('selectedBird')) || 0;
  const selectedBird = birds[selectedIndex] || birds[0];

  bird = {
    x: 50,
    y: 150,
    width: 50,
    height: 50,
    velocity: 0,
    alive: true,
    sprite: new Image(),
    isFlapping: false,
  };
  bird.sprite.src = selectedBird.src;
  window.bird = bird;
}

export function updateBird() {
  bird.velocity += gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > 512 || bird.y < 0) {
    bird.alive = false;
  }
}

export function drawBird(ctx) {
  let sx, sy;

  if (!bird.alive) {
    sx = 400;
    sy = 108;
  } else if (bird.isFlapping) {
    sx = 211;
    sy = 108;
  } else {
    sx = 12;
    sy = 108;
  }
  const sw = 200;
  const sh = 196;

  ctx.drawImage(
    bird.sprite,
    sx, sy, sw, sh,
    bird.x, bird.y,
    bird.width, bird.height
  );
}

export function flap(direction = 1) {
  if (!bird || !bird.alive) return;
  if (bird.alive) {
    bird.velocity = direction * lift;

        bird.isFlapping = true;
    setTimeout(() => {
      playFlapSound();
      bird.isFlapping = false;
    }, 250);
  }
}


export function isBirdDead() {
  return !bird.alive;
}

export function resetBird() {
  bird.y = 150;
  bird.velocity = 0;
  bird.alive = true;
}
