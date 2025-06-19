// import { unOrderedList, unOrderedList2 } from "./event.js";
import { completedLi, pendingLi } from "./event.js";
import { createTaskTemplate, toggleif } from "./helper.js";
import { getFromLocalstorage, saveToLocalStorage } from "./localstorage.js";
export const saved = getFromLocalstorage("tasks") || [];
export let savedIds = getFromLocalstorage("id") || 0;
export const Tasks = [...saved];
export let taskIds = savedIds;

//This function renders the created tasks to the DOM
export function addTask(taskInput) {
  let TaskObj = { task: taskInput, completed: false, id:crypto.randomUUID()};
  // saveToLocalStorage("id", taskIds);
  Tasks.push(TaskObj);
  saveToLocalStorage("tasks", Tasks);
  createTaskTemplate(TaskObj, pendingLi);
}

export function delTask(id) {
  Tasks.filter((task,ind) => {
   let index = ind;
     if(index !== -1 && task.id === id) {
        Tasks.splice(index,1)
        saveToLocalStorage("tasks",Tasks)
  }
  });
   
}

export function updateTask(listId, listItem) {
  Tasks.find((task) => {
    if (task.id === listId) {
      task.task = listItem.innerHTML;
      saveToLocalStorage("tasks", Tasks);
    }
  });
}


export function IstaskCompleted(listId, boolean) {
  Tasks.find((task) => {
    if (task.id === listId) {
      task.completed = boolean;
      saveToLocalStorage("tasks", Tasks);
    }
  });
}

