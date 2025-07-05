// import { unOrderedList, unOrderedList2 } from "./event.js";
import {  pendingLi } from "./event.js";
import { createTaskTemplate, showToast, taskCounter, toggleif } from "./helper.js";
import { getFromLocalstorage, saveToLocalStorage } from "./localstorage.js";
export const saved = getFromLocalstorage("tasks") || [];
export const Tasks = [...saved];

//This function renders the created tasks to the DOM
export function addTask(taskInput) {
  let generateId = Math.random().toString(36).slice(2);
  let TaskObj = { task: taskInput, completed: false, id: generateId };
  Tasks.push(TaskObj);
  saveToLocalStorage("tasks", Tasks);
  return createTaskTemplate(TaskObj, pendingLi);
}
//parmanently delete task from an array by mutating and save to LS
export function delTask(id) {
  Tasks.filter((task, ind) => {
    let index = ind;
    if (index !== -1 && task.id === id) {
      Tasks.splice(index, 1);
      saveToLocalStorage("tasks", Tasks);
    }
  });
  showToast("Task deleted")
  taskCounter()
}

//upadete list item and save to LS
export function updateTaskContent(listId, newListItem) {
  Tasks.find((task) => {
    if (task.id === listId) {
      task.task = newListItem;
      saveToLocalStorage("tasks", Tasks);
    }
  });
  showToast("Status updated")
}

export function IstaskCompleted(listId, boolean) {
  Tasks.find((task) => {
    if (task.id === listId) {
      task.completed = boolean;
      saveToLocalStorage("tasks", Tasks);
    }
  });
}
