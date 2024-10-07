document.addEventListener("DOMContentLoaded", function () {
  const clickableImage = document.getElementById("clickable-image");
  const clickSound = document.getElementById("click-sound");
  const cpuInfo = document.getElementById("cpu-info");
  const gpuInfo = document.getElementById("gpu-info");
  const ramInfo = document.getElementById("ram-info");
  const browserInfo = document.getElementById("browser-info");
  const fpsInfo = document.getElementById("fps-info");

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
      let fps = 0;

      function updateFPS() {
          const now = performance.now();
          frameCount++;
          const delta = now - lastFrameTime;

          if (delta >= 1000) {
              fps = frameCount;
              frameCount = 0;
              lastFrameTime = now;
              fpsInfo.textContent = `FPS: ${fps}`;
          }

          requestAnimationFrame(updateFPS);
      }

      updateFPS();
  }

  // Update Browser, RAM, and FPS information
  browserInfo.textContent = `Navigateur: ${getBrowserInfo()}`;
  ramInfo.textContent = `RAM: ${getRAMInfo()}`;
  getFPSInfo();

  // Placeholder for CPU and GPU information
  cpuInfo.textContent = `CPU: Information non disponible`;
  gpuInfo.textContent = `GPU: Information non disponible`;
});
