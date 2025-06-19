import {
  TransitionToInnerPage,
  ToggleTheme,
  toggleif,
  createTaskTemplate,
  handleTaskAction,
} from "./helper.js";
import { addTask, delTask, Tasks, updateTask } from "./task.js";
import { saveToLocalStorage } from "./localstorage.js";
import { searchForTasks, handleTaskState } from "./helper.js";

export const pendingLi = document.querySelector("#pendingTasks");
export const completedLi = document.querySelector("#completedT");
export let currentTheme = "light";
export const landingPage = document.querySelector("#landingPage");
export const innerPage = document.querySelector("#innerPage");
export const searchInput = document.getElementById("searchInput");
export const searchResults = document.getElementById("searchResults");
const getStartedBtn = document.querySelector("#getStartedBtn");
const ToggleBtn = document.querySelectorAll(".toggle");
const taskForm = document.querySelector("form");
const promptIllustration = document.querySelector("#promptIllustration");
const customBtn = document.getElementById("customBtn");
const links = document.querySelectorAll("[data-btn]");
const searchForTasksForm = document.getElementById("searchForTasksForm");

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
  if (!taskInput.value) {
    taskInput.required = true;
  } else {
    addTask(taskInput.value);
    taskInput.value = "";
    promptIllustration.remove();
  }
});

const pages = document.querySelectorAll("[data-role]");
links.forEach((link) => {
  let targ = link.dataset.btn;
  link.addEventListener("click", () => {
    let corresponding = document.querySelector(`[data-role="${targ}"]`);
    let correspondin = document.querySelector(`[data-role="${targ}"] ul`);
    links.forEach((element) => {
      element.classList.remove("border-bottom");
      pages.forEach((element) => {
        element.classList.add("hidden");
      });
    });
    correspondin.innerHTML = "";
    if (corresponding && correspondin.id === "completedT") {
      loadTaskTo();
    } else if (corresponding && correspondin.id === "pendingTasks") {
      loadTaskTo();
    }

    corresponding.classList.remove("hidden");
    link.classList.add("border-bottom");
  });
});

function loadTaskTo() {
  Tasks.forEach((element) => {
    if (element.completed === true) {
      createTaskTemplate(element, completedLi);
    } else {
      createTaskTemplate(element, pendingLi);
    }
  });
}

searchForTasksForm.addEventListener("click", (e) => {
  let cancelBtn = document.getElementById("cancelBtn");
  let input = e.target.closest("#searchInput");
  if (input) {
    searchForTasks();
    cancelBtn.classList.remove("hidden");
    input.addEventListener("input", () => {
      searchForTasks();
    });
  } else if (e.target.matches("button")) {
    e.preventDefault();
    cancelBtn.classList.add("hidden");
    searchResults.innerHTML = ""
  }
});

pendingLi.addEventListener("click", (e) => {
  handleTaskAction(e);
  handleTaskState(e, true);
});

completedLi.addEventListener("click", (e) => {
  handleTaskAction(e);
  handleTaskState(e, true);
});

searchResults.addEventListener("click", (e) => {
  handleTaskAction(e);
  handleTaskState(e, false);
});
