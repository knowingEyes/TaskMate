import { delTask, IstaskCompleted, Tasks, updateTask } from "./task.js";
import { saveToLocalStorage } from "./localstorage.js";
import { searchInput, searchResults } from "./event.js";

export function TransitionToInnerPage(e) {
  e.classList.add("fadeOut");
}

//Toggle themes and theme icons
export function ToggleTheme(elements, clas) {
  document.querySelector("#landingPage").classList.toggle("dark");
  document.querySelector("#innerPage").classList.toggle("dark");
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

// list template function
export function createTaskTemplate(task, ulToappend) {
  const checked = task.completed === true ? "checked" : "";
  let lists = createEl("li");
  lists.setAttribute("class", "list");
  lists.setAttribute("data-id",`${task.id}`)
  lists.innerHTML = `<div class ="listItemCon">
    <div class="itemsCon"><input type="checkbox" class ="checkInput" ${checked}><label class="listItem">${task.task}</label></div>
    <div class="btnsCon"><button class="doneBtn hidden" >done</button><button class="editBtn"><svg width="20"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width n h="1.5" stroke="currentColor" class="size-6">
   <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg></button><button class="delBtn"><svg width="20"   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"  />
 </svg></button></div>
    </div>`;
  ulToappend.append(lists);
}

// create element function
function createEl(element) {
  return document.createElement(element);
}

// search for tasks and render to UI
export function searchForTasks() {
  [...searchResults.children].forEach((element) => {
    element.remove();
  });

  Tasks.filter((task) => {
    if (searchInput.value === "") {
      searchResults.innerHTML = "";
    } else if (task.task.includes(searchInput.value)) {
      createTaskTemplate(task, searchResults);
    }
  });
}



export function handleTaskAction(e) {
  const doneBtn = e.target.closest(".btnsCon")?.querySelector(".doneBtn");
  const delbtn = e.target.closest(".delBtn");
  const editBtn = e.target.closest(".editBtn");
  const listItem = e.target.closest(".listItemCon")?.querySelector(".listItem");
  const EditPanel = document.querySelector("#editPanel");
  const listId = e.target.closest(".list").dataset.id;
  //Revisit
  if (delbtn) {
    e.target.closest(".list").remove();
    console.log(listId)
    //Revisit
    delTask(listId);
  } else if (editBtn) {
    listItem.contentEditable = true;
    toggleif([doneBtn, EditPanel], "hidden");
    toggleif([doneBtn, listItem], "position");
    listItem.contentEditable = true;
  } else if (doneBtn) {
    updateTask(listId, listItem);
    toggleif([doneBtn, EditPanel], "hidden");
    toggleif([doneBtn, listItem], "position");
    listItem.contentEditable = false;
  }
}

export function handleTaskState(e, boolean) {
  const checkBox = e.target.closest(".itemsCon")?.querySelector(".checkInput");
  const listId = e.target.closest(".list").dataset.id;
  const lists = e.target.closest(".list");
  if (e.target.matches("input[type='checkbox']")) {
    if (checkBox.checked) {
      setTimeout(() => {
        IstaskCompleted(listId, true);
        removelement(lists, boolean);
      }, 200);
    } else {
      removelement(lists, boolean);
      IstaskCompleted(listId, false);
    }
  }
}
function removelement(e, boolean) {
  if (boolean === true) e.remove();
}
