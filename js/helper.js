export function TransitionToInnerPage(e) {
  e.classList.add("fadeOut");
}
import { unOrderedList } from "./event.js";

export function ToggleTheme(elements) {
  document.querySelector("#landingPage").classList.toggle("dark");
  document.querySelector("#innerPage").classList.toggle("dark");
  ShowHide(elements);
}

export function ShowHide(elements) {
  Array.from(elements).forEach((element) => {
    if (!element.classList.contains("hidden")) {
      element.classList.add("hidden");
    } else {
      element.classList.remove("hidden");
    }
  });
}

export function createTaskTemplate(task) {
  let li = createEl("li");
  let checkInput = createEl("input");
  let buttonsCon = createEl("div");
  let itemCon = createEl("div");
  let editBtn = createEl("button");
  let delBtn = createEl("button");
  let listItem = createEl("label");
  checkInput.type = "radio";
  delBtn.setAttribute("id", "delete");
  editBtn.setAttribute("id", "edit");
  itemCon.classList = "containerlabel";
  listItem.id = "listItem";
  li.id = "list";
  editBtn.innerHTML = `<svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width n h="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>`;
  delBtn.innerHTML = `<svg width="20" height ="20"   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"  />
</svg>`;
  listItem.textContent = task.task;
  buttonsCon.append(editBtn, delBtn);
  itemCon.append(checkInput, listItem);
  li.append(itemCon, buttonsCon);
  unOrderedList.append(li);
}


function createEl(element) {
  return document.createElement(element)
}