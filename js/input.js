import { flap } from './bird.js';

export function setupInput() {
  const canvas = document.getElementById('game-canvas');
  
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    flap();
  }, { passive: false });
  
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.key === 'w') {
      flap();
    }
  });

  window.addEventListener('click', () => {
    flap();
  });

}
