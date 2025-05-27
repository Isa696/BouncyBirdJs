let menuAudio = null;
let gameAudio = null;
let flapAudio = null;
let bounceAudio = null;
let bounceTimeout = null;
let deathSounds = [];
let seedFadeOut = []

export function initAudio() {
  menuAudio = new Audio('./assets/sound/menu-song.mp3');
  gameAudio = new Audio('./assets/sound/main-song.ogg');
  flapAudio = new Audio('./assets/sound/flap-sound.mp3');
  bounceAudio = new Audio('./assets/sound/bounce-sound.mp3');
  
    for (let i = 0; i <= 5; i++) {
    const audio = new Audio(`./assets/sound/death-${i}.mp3`);
    audio.volume = 1;
    deathSounds.push(audio);
  }
    for (let i = 0; i <= 2; i++) {
    const audio = new Audio(`./assets/sound/0${i}_seed-fade-out.mp3`);
    audio.volume = 0.8;
    seedFadeOut.push(audio);
  }


  menuAudio.loop = true;
  gameAudio.loop = true;

  menuAudio.volume = 0.4;
  gameAudio.volume = 0.5;
  flapAudio.volume = 0.75;
  bounceAudio.volume = 0.75;
}

export function playMenuMusic() {
  stopGameMusic();
  menuAudio?.play().catch(() => {}); // silencioso si el navegador bloquea
}

export function stopMenuMusic() {
  if (menuAudio) {
    menuAudio.pause();
    menuAudio.currentTime = 0;
  }
}

export function playGameMusic() {
  stopMenuMusic();
  gameAudio?.play().catch(() => {});
}

export function stopGameMusic() {
  if (gameAudio) {
    gameAudio.pause();
    gameAudio.currentTime = 0;
  }
}

export function playFlapSound() {
  if (flapAudio) {
    flapAudio.currentTime = 0;
    flapAudio.play().catch(() => {});
  }
}

export function playBounceSound(startTime = 0, endTime = 0) {
  if (!bounceAudio) return;

  // Cancelar cualquier reproducción anterior
  clearTimeout(bounceTimeout);
  bounceAudio.pause();
  bounceAudio.currentTime = startTime;

  bounceAudio.play().catch(() => {});

  if (endTime > startTime) {
    // Detener el audio manualmente después de cierto tiempo
    const duration = (endTime - startTime) * 1000;
    bounceTimeout = setTimeout(() => {
      bounceAudio.pause();
      bounceAudio.currentTime = 0;
    }, duration);
  }
}

export function playRandomDeathSound() {
  if (deathSounds.length === 0) return;

  // Detener cualquier otro sonido de muerte que esté sonando
  for (let sound of deathSounds) {
    sound.pause();
    sound.currentTime = 0;
  }

  const randomIndex = Math.floor(Math.random() * deathSounds.length);
  const chosenSound = deathSounds[randomIndex];

  chosenSound.play().catch(() => {});
}

export function playSeedFadeOutSound() {
  if (seedFadeOut.length === 0) return;

  // Detener cualquier otro sonido de fade out que esté sonando
  for (let sound of seedFadeOut) {
    sound.pause();
    sound.currentTime = 0;
  }

  const randomIndex = Math.floor(Math.random() * seedFadeOut.length);
  const chosenSound = seedFadeOut[randomIndex];

  chosenSound.play().catch(() => {});
}