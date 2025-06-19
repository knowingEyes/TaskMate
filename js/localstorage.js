import { currentTheme } from "./event.js";
import { landingPage, innerPage } from "./event.js";

export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

export function getFromLocalstorage(value){
return JSON.parse(localStorage.getItem(value))
}


