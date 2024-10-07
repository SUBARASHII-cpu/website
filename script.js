document.addEventListener("DOMContentLoaded", function () {
  const clickableImage = document.getElementById("clickable-image");
  const clickSound = document.getElementById("click-sound");
  const cpuInfo = document.getElementById("cpu-info");
  const gpuInfo = document.getElementById("gpu-info");
  const ramInfo = document.getElementById("ram-info");
  const browserInfo = document.getElementById("browser-info");
  const fpsInfo = document.getElementById("fps-info");
  const exchangeRateInfo = document.getElementById("exchange-rate-info");

  clickableImage.addEventListener("click", function () {
      clickSound.play();
  });

  function updateFPS() {
      let lastFrameTime = performance.now();
      let frameCount = 0;

      function update() {
          const now = performance.now();
          const deltaTime = now - lastFrameTime;
          lastFrameTime = now;
          frameCount++;

          if (deltaTime >= 1000) {
              const fps = Math.round((frameCount / deltaTime) * 1000);
              fpsInfo.textContent = `FPS: ${fps}`;
              frameCount = 0;
          }

          requestAnimationFrame(update);
      }

      update();
  }

  updateFPS();

  function getDeviceInfo() {
      cpuInfo.textContent = `CPU: ${navigator.hardwareConcurrency} cores`;
      gpuInfo.textContent = `GPU: ${navigator.userAgent}`;
      ramInfo.textContent = `RAM: ${navigator.deviceMemory || "N/A"} GB`;
      browserInfo.textContent = `Navigateur: ${navigator.userAgent}`;
  }

  getDeviceInfo();

  async function fetchExchangeRate() {
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/CHF");
      const data = await response.json();
      const rate = data.rates.USD;
      exchangeRateInfo.textContent = `CHF/USD: ${rate}`;
  }

  fetchExchangeRate();

  // Logique du bouton pour masquer/afficher
  const deviceInfo = document.querySelector(".device-info");
  const toggleButton = document.getElementById("toggle-menu");

  toggleButton.addEventListener("click", function () {
      deviceInfo.classList.toggle("hidden");

      if (deviceInfo.classList.contains("hidden")) {
          toggleButton.textContent = "Afficher Informations Système";
      } else {
          toggleButton.textContent = "Masquer Informations Système";
      }
  });
});
