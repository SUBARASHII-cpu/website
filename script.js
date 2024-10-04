document
  .getElementById("clickable-image")
  .addEventListener("click", function (e) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤️";
    document.body.appendChild(heart);

    heart.style.left = `${e.clientX - 20}px`;
    heart.style.top = `${e.clientY - 20}px`;

    setTimeout(() => heart.remove(), 1000);

    const audio = document.getElementById("click-sound");
    audio.volume = 1;
    audio.play();
  });
