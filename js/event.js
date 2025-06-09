import { TransitionToInnerPage,ToggleTheme } from "./helper.js";

const getStartedBtn = document.querySelector("#getStartedBtn");
const ToggleBtn = document.querySelector(".toggle")

getStartedBtn.addEventListener("click", (e) => {
  TransitionToInnerPage(e);
});

ToggleBtn.addEventListener("click",()=> {
  let themeIcon = document.querySelectorAll("svg")
    ToggleTheme(themeIcon)
})

