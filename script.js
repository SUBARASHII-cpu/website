document.addEventListener("DOMContentLoaded", function () {
  const clickableImage = document.getElementById("clickable-image");
  const clickSound = document.getElementById("click-sound");
  const cpuInfo = document.getElementById("cpu-info");
  const gpuInfo = document.getElementById("gpu-info");
  const ramInfo = document.getElementById("ram-info");
  const browserInfo = document.getElementById("browser-info");
  const fpsInfo = document.getElementById("fps-info");
  const exchangeRateInfo = document.getElementById("exchange-rate-info");

  clickableImage.addEventListener("click", function (e) {
      clickSound.play();
      createHeart(e);
  });

  function createHeart(event) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = "❤️";
      document.body.appendChild(heart);

      heart.style.left = `${event.clientX - 20}px`;
      heart.style.top = `${event.clientY - 20}px`;

      setTimeout(() => {
          heart.remove();
      }, 1000);
  }

  // Function to get Browser information
  function getBrowserInfo() {
      return `${navigator.userAgent}`;
  }

  // Function to get RAM information
  function getRAMInfo() {
      if (navigator.deviceMemory) {
          return `${navigator.deviceMemory} GB`;
      } else {
          return "Information non disponible";
      }
  }

  // Function to get FPS information
  function getFPSInfo() {
      let lastFrameTime = performance.now();
      let frameCount = 0;
      const calculateFPS = () => {
          const now = performance.now();
          frameCount++;
          const delta = now - lastFrameTime;

          if (delta >= 1000) {
              const fps = (frameCount / delta) * 1000;
              fpsInfo.innerText = `FPS: ${Math.round(fps)}`;
              frameCount = 0;
              lastFrameTime = now;
          }
          requestAnimationFrame(calculateFPS);
      };
      requestAnimationFrame(calculateFPS);
  }

  // Set initial values for system info
  cpuInfo.innerText = "CPU: Information non disponible via le navigateur";
  gpuInfo.innerText = "GPU: Information non disponible via le navigateur";
  ramInfo.innerText = `RAM: ${getRAMInfo()}`;
  browserInfo.innerText = `Navigateur: ${getBrowserInfo()}`;
  getFPSInfo();

  // Fetch exchange rate information (e.g., CHF to USD)
  fetch("https://api.exchangerate-api.com/v4/latest/CHF")
      .then(response => response.json())
      .then(data => {
          const usdRate = data.rates.USD;
          exchangeRateInfo.innerText = `CHF/USD: ${usdRate}`;
      })
      .catch(error => {
          exchangeRateInfo.innerText = "Taux de change non disponible";
          console.error("Erreur lors de la récupération des taux de change:", error);
      });
});
