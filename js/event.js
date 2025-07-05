import {
  TransitionToInnerPage,
  ToggleTheme,
  handleTaskAction,
  checkEmptyList,
  handleTasksInteraction,
  loadTaskTo,
  closeModal,
  removelement,
  removeOverlayBlurBg,
  showToast,
  taskCounter,
  completedtaskDisplay,
  alltaskDisplay,
  addOverlayBlurBg,
  openConfirmReset,
  closeConfirmReset,
  closeConfirmDel,
} from "./helper.js";
import { addTask, delTask, updateTaskContent, Tasks } from "./task.js";
import { saveToLocalStorage } from "./localstorage.js";
import { searchForTasks, handleTaskState } from "./helper.js";
import { animateLists } from "./helper.js";
import { enableTypingEffect } from "./ui_Effects.js";
import Sortable from "sortablejs";
// import Sortable from "sortablejs";
import { settings, savedSettings } from "./settings.js";
import { savedUsername } from "./script.js";
const confirmDel = document.querySelector(".confirmDel");
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
const taskForm = document.querySelector("#addTaskForm");
const customBtn = document.getElementById("customBtn");
const links = document.querySelectorAll("[data-btn]");
const searchForTasksForm = document.getElementById("searchForTasksForm");
const formCon = document.getElementById("addTaskContainer");
const lists = document.querySelectorAll(".list");
const editInput = document.querySelector(".editInput");
const editModal = document.querySelector(".editModal");
const editPanelBlur = document.querySelector("#editPanelBlur");
const preference = document.querySelectorAll(".preference");
const welcomeToastForm = document.getElementById("welcomeToastForm");
const greeting = document.querySelector(".greeting");
const welcomeToast = document.getElementById("welcomeToast");
const userName = document.querySelector(".userName");
const resetProfile = document.getElementById("resetProfile");
const resetProfileModal = document.getElementById("resetProfileModal");
let dragAndDrop = new Sortable(pendingLi, {
  animation: 250,
  ghostClass: "ghost",
  swapThreshold: 0.65,
  onEnd: function (evt) {
    const movedTask = Tasks.splice(evt.oldIndex, 1)[0];
    Tasks.splice(evt.newIndex, 0, movedTask);
    saveToLocalStorage("tasks", Tasks);
  },
});
const store = { currentListItem: null, listId: null, list: null };

export {
  resetProfileModal,
  welcomeToast,
  userName,
  greeting,
  store,
  savedSettings,
  pendingLi,
  completedLi,
  currentTheme,
  landingPage,
  innerPage,
  searchInput,
  promptIllustration,
  searchResults,
  editInput,
  editModal,
  editPanelBlur,
  confirmDel,
  preference,
};
getStartedBtn.addEventListener("click", (e) => {
  let landing = e.target.closest("#landingPage");
  TransitionToInnerPage(landing);
  innerPage.classList.remove("hidden");
  landing.addEventListener("animationend", () => {
    landing.style.display = "none";
  });
  setTimeout(() => {
    if (!savedUsername) {
      welcomeToast?.classList.add("visible");
      addOverlayBlurBg();
    }
  }, 400);
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
  if (!settings["auto close input"]) {
    formCon.classList.remove("visible");
  }
  promptIllustration[0].classList.add("hidden");
  taskCounter();
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
        element.classList.add("hidden");
      });
    });
    if (corresponding) {
      !correspondingUl ? null : (correspondingUl.innerHTML = "");
      loadTaskTo();
      checkEmptyList(0);
    }

    corresponding.classList.remove("hidden");
    link.classList.add("activeSec");
    if (settings["enable haptic feed back"]) navigator.vibrate(10);
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

customBtn.addEventListener("click", () => {
  formCon.classList.add("visible");
  document.querySelector("#taskInput").focus();
});

editModal.addEventListener("click", (e) => {
  let cancelBtn = e.target.closest(".cancelBtn");
  let doneBtn = e.target.closest(".doneBtn");
  if (cancelBtn) {
    closeModal();
    store.currentListItem = null;
  } else if (doneBtn) {
    store.currentListItem.textContent = editInput.value;
    closeModal();
    updateTaskContent(store.listId, editInput.value);
    store.currentListItem = null;
  }
});

// editPanelBlur.addEventListener("click", () => {
//   closeModal();
//   closeConfirmDel();
//   // removeOverlayBlurBg();
// });

confirmDel.addEventListener("click", (e) => {
  if (e.target.matches(".cancelConfirm")) {
    closeConfirmDel();
    removeOverlayBlurBg();
    store.listId = null;
  } else if (e.target.matches(".delConfirm")) {
    delTask(store.listId);
    setTimeout(() => {
      removelement(store.list);
    }, 500);
    checkEmptyList();
    closeConfirmDel();
    removeOverlayBlurBg();
    store.listId = null;
  }
});

preference.forEach((el) => {
  el.addEventListener("change", (e) => {
    const id = e.target.id;
    const switchCheckInput = e.target.matches(".switchCheck");
    if (switchCheckInput) {
      settings[`${id}`] === true
        ? (settings[`${id}`] = false)
        : (settings[`${id}`] = true);
      saveToLocalStorage("settings", settings);
    }
    if (e.target.id === "task counter badge") {
      alltaskDisplay.classList.toggle("hidden");
      completedtaskDisplay.classList.toggle("hidden");
      taskCounter();
    } else if (e.target.id === "drag and drop") {
      toggleDragAndDrop();
    }
    showToast("Preference saved");
  });
});

export function toggleDragAndDrop() {
  if (!settings["drag and drop"]) {
    dragAndDrop.option("disabled", false);
  } else if (settings["drag and drop"]) {
    dragAndDrop.option("disabled", true);
  }
}

welcomeToastForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const userNameInput = welcomeToastForm.elements.username;
  let inputVal = userNameInput.value;
  welcomeToast.classList.remove("visible");
  saveToLocalStorage("username", inputVal);
  userName.textContent = inputVal;
  enableTypingEffect(`Welcome, ${inputVal}`);
  removeOverlayBlurBg();
});

resetProfile.addEventListener("click", (e) => {
  openConfirmReset();
  addOverlayBlurBg();
});

resetProfileModal.addEventListener("click", (e) => {
  if (e.target.matches(".resetBtn")) {
    localStorage.clear();
    location.reload();
  } else if (e.target.matches(".cancelResetBtn")) {
    closeConfirmReset();
    removeOverlayBlurBg();
  }
});
