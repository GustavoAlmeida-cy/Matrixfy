// HTML elements
const body = document.querySelector("body");
const bntMode = document.querySelector("#btn-mode");
const themeButton = document.querySelector("#theme");
const bntMenu = document.querySelector("#bnt-menu");
const settings_menu = document.querySelector("#settings-menu");

// Change mode
bntMode.addEventListener("click", () => {
  bntMode.classList.toggle("off");
  bntMode.classList.toggle("on");
});

// Change theme
themeButton.addEventListener("click", () => {
  themeButton.classList.toggle("on");
  body.classList.toggle("on");
});

// Change btn-menu and settings-menu class
bntMenu.addEventListener("click", () => {
  bntMenu.classList.toggle("on");
  settings_menu.classList.toggle("hidden");
});
