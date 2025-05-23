import { playFlapSound } from './sound.js';

let bird;
let gravity = 0.5;
let lift = -8;

export function createBird() {
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
  bird.sprite.src = './assets/bird.png';
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
    sx = 142;
    sy = 266;
  } else if (bird.isFlapping) {
    sx = 255;
    sy = 78;
  } else {
    sx = 19;
    sy = 68;
  }
  const sw = 209;
  const sh = 186;

  ctx.drawImage(
    bird.sprite,
    sx, sy, sw, sh,
    bird.x, bird.y,
    bird.width, bird.height
  );
}

export function flap(direction = 1) {
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
