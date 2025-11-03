import "../scss/main.scss";
import "./event.js";
import "./helper.js";
import "./localstorage.js";
import "./settings.js";
import { getFromLocalstorage } from "./localstorage.js";
import {
  completedLi,
  confirmDel,
  editModal,
  innerPage,
  landingPage,
  pendingLi,
  resetProfileModal,
  toggleDragAndDrop,
  userName,
  welcomeToast,
} from "./event.js";
import { Tasks } from "./task.js";
import { checkEmptyList, createTaskTemplate, taskCounter } from "./helper.js";
import "./ui_Effects.js";
import { settings } from "./settings.js";
import { enableTypingEffect } from "./ui_Effects.js";

//Get saved keys from local storage
export const savedUsername = getFromLocalstorage("username");
const theme = getFromLocalstorage("theme");
const savedprefferedSettings = getFromLocalstorage("settings");
const switchInput = document.querySelectorAll(".switch input");

//Apply saved key VALUES from local storage their corresponding elements
window.addEventListener("DOMContentLoaded", () => {
  landingPage.classList.add(theme);
  innerPage.classList.add(theme);
  let moon = document.querySelectorAll(".toggle svg.moon");
  let sun = document.querySelectorAll(".toggle svg.sun");
  if (theme) {
    if (theme === "light") {
      sun.forEach((element) => {
        element.classList.add("hidden");
      });
      moon.forEach((element) => {
        element.classList.remove("hidden");
      });
    } else {
      sun.forEach((element) => {
        element.classList.remove("hidden");
        element;
      });
      moon.forEach((element) => {
        element.classList.add("hidden");
      });
    }
  }

  //append list to initial location from localstorage on Dom-Refresh
  Tasks.filter((element) => {
    if (element.completed === true) {
      createTaskTemplate(element, completedLi);
    } else {
      createTaskTemplate(element, pendingLi);
    }
  });

  switchInput.forEach((element) => {
    if (element.checked && !settings[`${element.id}`]) {
      return (element.checked = false);
    } else if (settings[`${element.id}`]) {
      element.checked = true;
    }
  });

  checkEmptyList(0);
  taskCounter();
  if (savedUsername) {
    landingPage.remove();
    enableTypingEffect(`Welcome back, ${savedUsername}`);
    welcomeToast.classList.add("notVisible");
    innerPage.classList.remove("hidden");
  }
  toggleDragAndDrop();
  userName.textContent = savedUsername;
});
