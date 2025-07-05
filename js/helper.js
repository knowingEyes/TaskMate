export let completedtaskDisplay = document.getElementById(
  "counterBadgeCompleted"
);
export let alltaskDisplay = document.getElementById("counterBadgeAll");
import { delTask, IstaskCompleted, Tasks, updateTaskContent } from "./task.js";
import {
  searchInput,
  searchResults,
  pendingLi,
  completedLi,
  editInput,
  editModal,
  store,
  confirmDel,
  landingPage,
  innerPage,
  resetProfileModal
} from "./event.js";
import ScrollReveal from "scrollreveal";
import { settings } from "./settings.js";


export function TransitionToInnerPage(e) {
  e.classList.add("fadeOut");
}

//Toggle themes and theme icons
export function ToggleTheme(elements, clas) {
  landingPage?.classList.toggle("dark");
  innerPage.classList.toggle("dark");
  toggleif(elements, clas);
}

//toggle elements and assign class base on condition
export function toggleif(elements, clas) {
  elements.forEach((element) => {
    if (!element.classList.contains(clas)) {
      element.classList.add(clas);
    } else {
      element.classList.remove(clas);
    }
  });
}

// list items template structure
export function createTaskTemplate(task, ulToappend) {
  const checked = task.completed ? "checked" : "";
  const lineThrough = task.completed
    ? "text-decoration:line-through; color:#94a3b8;"
    : "";
  let lists = createEl("li");
  lists.setAttribute("class", "list");
  lists.setAttribute("data-id", `${task.id}`);
  setTimeout(() => lists.setAttribute("data-state", `animated`));
  lists.innerHTML = `<div class ="listItemCon">
    <div class="itemsCon"><div class="customCheckCon"><input type="checkbox" class ="checkInput" ${checked}><span class="check"></span></div><label class="listItem" style ="${lineThrough}">${
    task.task
  }</label></div>
    <div class="btnsCon"><button class="doneBtn hidden">Done</button><button class="editBtn"><svg width="20"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width n h="1.5" stroke="currentColor" class="size-6">
   <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg></button><button class="delBtn"><svg width="20"   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"  />
 </svg></button></div>
    <span class ="timeStamp"><svg width="13" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
 ${timeStamp(new Date())}</span>
    </div>`;
  return ulToappend.append(lists);
}

// create element function
function createEl(element) {
  return document.createElement(element);
}

// search for tasks and render to UI
export function searchForTasks() {
  const inputValueDisplay = document.getElementById("inputValueDisplay");
  const emptySearchInputPng = document.getElementById("emptySearchInputPng");
  const noResultMessage = document.getElementById("noSearchResultsPng");
  let emptyList = (searchResults.innerHTML = "");
  Tasks.filter((task) => {
    if (searchInput.value === "") {
      emptyList;
      noResultMessage.classList.add("hidden");
      emptySearchInputPng.classList.remove("hidden");
    } else if (task.task.includes(searchInput.value)) {
      createTaskTemplate(task, searchResults);
    } else {
      emptySearchInputPng.classList.add("hidden");
      noResultMessage.classList.remove("hidden");
      inputValueDisplay.textContent = ` "${searchInput.value}"`;
    }
  });
}

export function handleTaskAction(e) {
  const doneBtn = e.target.closest(".btnsCon")?.querySelector(".doneBtn");
  const delbtn = e.target.closest(".delBtn");
  const editBtn = e.target.closest(".editBtn");
  const listItem = e.target.closest(".listItemCon")?.querySelector(".listItem");
  const listId = e.target.closest(".list")?.dataset.id;
  const list = e.target.closest(".list");
  if (delbtn) {
    if (settings["confirm before deleting tasks"]) {
      store.list = list;
      store.listId = listId;
      addOverlayBlurBg();
      openConfirmDel();
    } else {
      setTimeInterval(list, 500); //visit
      delTask(listId);
    }
  } else if (editBtn) {
    openModal();
    editInput.value = listItem.textContent;
    store.listId = listId;
    store.currentListItem = listItem;
  }
}

export function handleTaskState(e, boolean) {
  const checkBox = e.target.closest(".itemsCon")?.querySelector(".checkInput");
  const listId = e.target.closest(".list")?.dataset.id;
  const lists = e.target.closest(".list");
  if (e.target.matches("input[type='checkbox']")) {
    if (checkBox.checked) {
      IstaskCompleted(listId, true);
      taskCounter();
      setTimeout(() => {
        removelement(lists, boolean);
      }, 500);
      showToast("Task added to completed");
      if (!settings.sound) {
        checkSound();
      }
      navigator.vibrate(10);
    } else {
      IstaskCompleted(listId, false);
      taskCounter();
      setTimeout(() => {
        removelement(lists, boolean);
      }, 500);
      navigator.vibrate(10);
    }
  }
}
export function removelement(e, boolean = true) {
  if (boolean === true) e.remove();
}

export function loadTaskTo() {
  Tasks.forEach((element) => {
    if (element.completed === true) {
      createTaskTemplate(element, completedLi);
    } else {
      createTaskTemplate(element, pendingLi);
    }
  });
}

export function checkEmptyList(duration = 500) {
  [pendingLi, completedLi, searchResults].forEach((ul) => {
    let ulsData = ul.dataset.ul;
    let matchingData = document.querySelector(
      `[data-illustration="${ulsData}"]`
    );
    setTimeout(() => {
      if (ul.children.length === 0) {
        matchingData.classList.remove("hidden");
      } else {
        matchingData.classList.add("hidden");
      }
    }, duration);
  });
}

export function handleTasksInteraction(e) {
  handleTaskAction(e);
  handleTaskState(e, true);
}

export function animate(el, obj = {}) {
  ScrollReveal().reveal(el, {
    origin: "top",
    distance: "20px",
    duration: "500",
    opacity: 0,
    easing: "ease-out",
    reset: true,
    mobile: true,
    cleanup: true,
    ...obj,
  });
}

export function animateLists(obj) {
  const lists = document.querySelectorAll(".list");
  lists.forEach((list) => {
    if (list.dataset.state !== "animated") {
      animate(list, obj);
    }
  });
}

function timeStamp(created) {
  const currentDate = new Date().getTime();
  const taskCreated = created.getTime();
  const timeDiff = currentDate - taskCreated;
  const localDateString = `${created.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;
  let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  if (!settings["local date"]) {
    if (days === 0) {
      return `Today`;
    } else if (days <= 7) {
      return `${days} ago`;
    } else if (days > 7) {
      return localDateString;
    }
  } else {
    return localDateString;
  }
}

export function openModal() {
  editModal.classList.add("fadeInUp");
  editPanelBlur.classList.remove("hidden");
}

export function closeModal() {
  editModal.classList.remove("fadeInUp");
  editPanelBlur.classList.add("hidden");
}

export function closeConfirmDel() {
  confirmDel.classList.remove("fadeInBottom");
}

export function openConfirmDel() {
  confirmDel.classList.add("fadeInBottom");
}
export function addOverlayBlurBg() {
  editPanelBlur.classList.remove("hidden");
}

export function removeOverlayBlurBg() {
  editPanelBlur.classList.add("hidden");
}

export function checkSound(muted = false) {
  let audioSound = new Audio("assets/audios/slick-notification.mp3");
  audioSound.muted = muted;
  audioSound.play();
}

export function setTimeInterval(el, interval) {
  return setInterval(() => {
    removelement(el);
  }, interval);
}
export function openConfirmReset() {
  resetProfileModal.classList.add("fadeInUp");
}
export function closeConfirmReset() {
  resetProfileModal.classList.remove("fadeInUp");
}

export function showToast(toastMsg = "Status updated") {
  const toast = document.getElementById("statusToast");
  toast.textContent = toastMsg;
  toast.classList.add("showToast");
  setTimeout(() => {
    toast.classList.remove("showToast");
  }, 2500);
}

export function taskCounter() {
  let completedtaskDisplay = document.getElementById("counterBadgeCompleted");
  let alltaskDisplay = document.getElementById("counterBadgeAll");
  let completedtaskscount = 0;
  let alltaskscount = 0;
  if (!settings["task counter badge"])
    for (let i = 0; i < Tasks.length; i++) {
      if (Tasks[i]["completed"]) {
        completedtaskscount++;
      } else {
        alltaskscount++;
      }
      completedtaskDisplay.textContent = completedtaskscount;
      alltaskDisplay.textContent = alltaskscount;
    }
  else {
    completedtaskDisplay.classList.add("hidden");
    alltaskDisplay.classList.add("hidden");
  }
}
