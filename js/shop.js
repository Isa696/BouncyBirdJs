import { seedsTotal } from "./seeds.js";

    const shopTooltip = document.getElementById('shop-tooltip');
    function showShopTooltip( innerText ) {
      shopTooltip.classList.add('show');
      shopTooltip.textContent = innerText;
    setTimeout(() => {
      shopTooltip.classList.remove('show');
    }, 2000);
    }


export const birds = [
  { name: "Bouncy", src: "./assets/bouncy.png", unlocked: true, price: 0 },
  { name: "Grudge", src: "./assets/grudge.png", unlocked: false, price: 250 },
  { name: "Zenith", src: "./assets/zenith.png", unlocked: false, price: 500 },
  { name: "Sunny", src: "./assets/sunny.png", unlocked: false, price: 1000 },
];

let currentBirdIndex = 0;
// Al iniciar:
loadUnlockedBirds();

function loadUnlockedBirds() {
  const unlocked = JSON.parse(localStorage.getItem("unlockedBirds")) || [true, false, false, false];
  birds.forEach((b, i) => b.unlocked = unlocked[i]);
}

function saveUnlockedBirds() {
  const unlocked = birds.map(b => b.unlocked);
  localStorage.setItem("unlockedBirds", JSON.stringify(unlocked));
}

function renderShop() {
  const bird = birds[currentBirdIndex];
  document.getElementById("shop-bird-img").src = bird.src;
  document.getElementById("bird-name").textContent = bird.name;
const priceContainer = document.getElementById("bird-price");

if (bird.unlocked) {
  priceContainer.textContent = "Desbloqueado";
} else {
  priceContainer.innerHTML = `
    ${seedsTotal} /
    ${bird.price}
    <img src="./assets/seed/03_seed.png" alt="semilla" style="width: 20px; height: 20px; vertical-align: middle; margin-left: 6px;" />
  `;
}

  const button = document.getElementById("buy-or-select");
  button.textContent = bird.unlocked ? "Seleccionar" : "Comprar";
}

document.getElementById("prev-bird").onclick = () => {
  currentBirdIndex = (currentBirdIndex - 1 + birds.length) % birds.length;
  renderShop();
};

document.getElementById("next-bird").onclick = () => {
  currentBirdIndex = (currentBirdIndex + 1) % birds.length;
  renderShop();
};

document.getElementById("buy-or-select").onclick = () => {
  const bird = birds[currentBirdIndex];
  if (bird.unlocked) {
    localStorage.setItem("selectedBird", currentBirdIndex);
    showShopTooltip("¡Pájaro seleccionado!");
  } else {
    const totalSeeds = parseInt(localStorage.getItem("totalSeeds") || "0");
    if (totalSeeds >= bird.price) {
      bird.unlocked = true;
      saveUnlockedBirds();
      localStorage.setItem("totalSeeds", totalSeeds - bird.price);
      showShopTooltip("¡Pájaro desbloqueado!");
      renderShop();
      location.reload();    } else {
      showShopTooltip("No tienes suficientes semillas.");
    }
  }
};

  export function openShop() {
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("shop-screen").style.display = "block";
  renderShop();
}

document.getElementById("back-to-menu").onclick = () => {
  document.getElementById("shop-screen").style.display = "none";
  document.getElementById("main-menu").style.display = "block";
};
