import { TransitionToInnerPage, ToggleTheme } from "./helper.js";
import { addTask } from "./task.js";
export const unOrderedList = document.querySelector("ul");

const getStartedBtn = document.querySelector("#getStartedBtn");
const ToggleBtn = document.querySelectorAll(".toggle");
const taskForm = document.querySelector("form");

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

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let taskInput = taskForm.elements.taskInput;
  addTask(taskInput.value);
});
