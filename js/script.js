// HTML elements
const themeButton = document.querySelector("#theme");
const body = document.querySelector("body");
const a = document.querySelectorAll("a");
const bntMenu = document.querySelector("#bnt-menu");
const settings_menu = document.querySelector("#settings-menu");

// Change theme class
themeButton.addEventListener("click", () => {
  themeButton.classList.toggle("on");

  body.classList.toggle("on");

  a.forEach((el) => {
    el.classList.toggle("on");
  });
});

// Change settings menu class
bntMenu.addEventListener("click", () => {
  bntMenu.classList.toggle("on");
  settings_menu.classList.toggle("hidden");
});
