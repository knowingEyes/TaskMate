import {
  TransitionToInnerPage,
  ToggleTheme,
  handleTaskAction,
  checkEmptyList,
  handleTasksInteraction,
  loadTaskTo,
} from "./helper.js";
import { addTask } from "./task.js";
import { saveToLocalStorage } from "./localstorage.js";
import { searchForTasks, handleTaskState } from "./helper.js";
import ScrollReveal from "scrollreveal";
import { animateLists } from "./helper.js";

const pendingLi = document.querySelector("#pendingTasks");
const completedLi = document.querySelector("#completedT");
let currentTheme = "light";
const landingPage = document.querySelector("#landingPage");
const innerPage = document.querySelector("#innerPage");
const searchInput = document.getElementById("searchInput");
const promptIllustration = document.querySelectorAll(".promptIllustration");
const searchResults = document.getElementById("searchResults");
const getStartedBtn = document.querySelector("#getStartedBtn");
const ToggleBtn = document.querySelectorAll(".toggle");
const taskForm = document.querySelector("form");
const customBtn = document.getElementById("customBtn");
const links = document.querySelectorAll("[data-btn]");
const searchForTasksForm = document.getElementById("searchForTasksForm");
const formCon = document.getElementById("addTaskContainer");
const lists = document.querySelectorAll(".list");
export {
  pendingLi,
  completedLi,
  currentTheme,
  landingPage,
  innerPage,
  searchInput,
  promptIllustration,
  searchResults,
};
getStartedBtn.addEventListener("click", (e) => {
  let landing = e.target.closest("#landingPage");
  TransitionToInnerPage(landing);
  innerPage.classList.remove("hidden");
  landing.addEventListener("animationend", () => {
    landing.style.display = "none";
  });
});

ToggleBtn.forEach((button) => {
  button.addEventListener("click", () => {
    let themeIcon = document.querySelectorAll(".toggle svg");
    ToggleTheme(themeIcon, "hidden");
    if (landingPage.classList.contains("dark")) {
      saveToLocalStorage("theme", "dark");
    } else {
      saveToLocalStorage("theme", "light");
    }
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let taskInput = taskForm.elements.taskInput;
  if (taskInput.value === "") {
    taskInput.required = true;
    return;
  }
  addTask(taskInput.value);
  taskInput.value = "";
  animateLists({
    origin: "bottom",
    distance: "14px",
    duration: "400",
    opacity: 0,
    easing: "cubic-bezier(0.23, 1, 0.32, 1)",
    interval: 0,
    reset: false,
    mobile: true,
  });

  promptIllustration[0].classList.add("hidden");
});

const pages = document.querySelectorAll("[data-role]");
links.forEach((link) => {
  let targ = link.dataset.btn;
  link.addEventListener("click", () => {
    let corresponding = document.querySelector(`[data-role="${targ}"]`);
    let correspondingUl = document.querySelector(`[data-role="${targ}"] ul`);
    links.forEach((element) => {
      element.classList.remove("activeSec");
      pages.forEach((element) => {
        element.classList.add("notVisible");
      });
    });
    if (corresponding && correspondingUl.id === "completedT") {
      correspondingUl.innerHTML = "";
      loadTaskTo()
      checkEmptyList(0);
    } else if (corresponding && correspondingUl.id === "pendingTasks") {
      correspondingUl.innerHTML = "";
      loadTaskTo();
      checkEmptyList(0);
    } else if (corresponding && correspondingUl.id === "searchResults") {
      checkEmptyList(0);
    }
    corresponding.classList.remove("notVisible");
    link.classList.add("activeSec");
  });
});

searchForTasksForm.addEventListener("click", (e) => {
  let cancelBtn = document.getElementById("cancelBtn");
  let input = e.target.closest("#searchInput");
  if (input) {
    cancelBtn.classList.remove("hidden");
    input.addEventListener("input", () => {
      searchForTasks();
      checkEmptyList(0);
    });
  } else if (e.target.matches("button")) {
    e.preventDefault();
    cancelBtn.classList.add("hidden");
    searchInput.value = "";
    searchForTasks();
    checkEmptyList(0);
  }
});

pendingLi.addEventListener("click", (e) => {
  handleTasksInteraction(e);
  checkEmptyList();
});

completedLi.addEventListener("click", (e) => {
  handleTasksInteraction(e);
  checkEmptyList();
});

searchResults.addEventListener("click", (e) => {
  handleTaskAction(e);
  handleTaskState(e, false);
  checkEmptyList(0);
});

document.addEventListener("DOMContentLoaded", checkEmptyList);

customBtn.addEventListener("click", () => {
  formCon.classList.add("visible");
  document.querySelector("#taskInput").focus();
});
