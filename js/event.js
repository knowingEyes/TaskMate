import { TransitionToInnerPage, ToggleTheme } from "./helper.js";

const getStartedBtn = document.querySelector("#getStartedBtn");
const ToggleBtn = document.querySelectorAll(".toggle");

getStartedBtn.addEventListener("click", (e) => {
  let landing = e.target.closest("#landingPage");
  TransitionToInnerPage(landing);
  landing.addEventListener("animationend", () => {
    landing.style.display = "none";
  });
  
});

ToggleBtn.forEach((button) => {
  button.addEventListener("click", () => {
    let themeIcon = document.querySelectorAll(".toggle svg");
    ToggleTheme(themeIcon);
  });
});
