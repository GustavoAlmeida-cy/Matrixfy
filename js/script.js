// HTML elements
const themeButton = document.querySelector("#theme");
const body = document.querySelector("body");
const a = document.querySelectorAll("a");

// Change theme class
themeButton.addEventListener("click", () => {
  themeButton.classList.toggle("on");

  body.classList.toggle("on");

  a.forEach((el) => {
    el.classList.toggle("on");
  });
});
