import "./event.js";
import "./helper.js";
import "./localstorage.js";
import { getFromLocalstorage, saveToLocalStorage } from "./localstorage.js";
import { completedLi, pendingLi, promptIllustration } from "./event.js";
import { Tasks } from "./task.js";
import { createTaskTemplate } from "./helper.js";
import Sortable from "sortablejs";
import "./ui_Effects.js";


//Get saved keys from local storage
let theme = getFromLocalstorage("theme");

//Apply saved key VALUES from local storage their corresponding elements
landingPage.classList.add(theme);
innerPage.classList.add(theme);
let moon = document.querySelectorAll(".toggle svg.moon");
let sun = document.querySelectorAll(".toggle svg.sun");

if (theme === "light") {
  sun.forEach((element) => {
    element.classList.add("hidden");
  });
  moon.forEach((element) => {
    element.classList.remove("hidden");
  });
}

//append list to initial location from localstorage on Dom-Refresh
Tasks.filter((element) => {
  if (element.completed === true) {
    createTaskTemplate(element, completedLi);
  } else {
    createTaskTemplate(element, pendingLi);
  }
});
