// HTML elements
const body = document.querySelector("body");
const a = document.querySelectorAll("a");
const themeButton = document.querySelector("#theme");
const bntMenu = document.querySelector("#bnt-menu");
const settings_menu = document.querySelector("#settings-menu");
const options = document.querySelectorAll(".option");

// Change theme
themeButton.addEventListener("click", () => {
  themeButton.classList.toggle("on");

  body.classList.toggle("on");

  a.forEach((el) => {
    el.classList.toggle("on");
  });

  options.forEach((el) => {
    el.classList.toggle("on");
  });
});

// Change btn-menu and settings-menu class
bntMenu.addEventListener("click", () => {
  bntMenu.classList.toggle("on");
  settings_menu.classList.toggle("hidden");
});
