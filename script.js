document.addEventListener("DOMContentLoaded", function () {
  const clickableImage = document.getElementById("clickable-image");
  const clickSound = document.getElementById("click-sound");
  const cpuInfo = document.getElementById("cpu-info");
  const fpsInfo = document.getElementById("fps-info");

  clickableImage.addEventListener("click", function () {
      clickSound.play();
      createHeart(clickableImage);
  });

  function createHeart(element) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = "❤️";
      document.body.appendChild(heart);

      const rect = element.getBoundingClientRect();
      heart.style.left = `${rect.left + rect.width / 2}px`;
      heart.style.top = `${rect