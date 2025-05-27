// efceto typeit
document.addEventListener("DOMContentLoaded", function () {
  new TypeIt("#hero-title", {
    strings: ["Bienvenido a TechStore"],
    speed: 80,
    breakLines: false,
    waitUntilVisible: true,
    loop: false,
    loopDelay: 3000,
    // cursor: true,
    cursorChar: "_",
    cursorSpeed: 1000,
  }).go();
});

