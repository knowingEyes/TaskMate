import "./event.js";
import "./helper.js";
import "./localstorage.js";
import { getFromLocalstorage } from "./localstorage.js";
import { completedLi, pendingLi} from "./event.js";
import { Tasks } from "./task.js";
import { createTaskTemplate } from "./helper.js";
import Sortable from "sortablejs";

//set saved theme from local storage
let theme = getFromLocalstorage("theme");
if (theme) {
  landingPage.classList.add(theme);
  innerPage.classList.add(theme);
}

//append list to initial location from localstorage on Dom-Refresh
Tasks.filter((element) => {
  if (element.completed === true) {
    createTaskTemplate(element, completedLi);
  } else {
    createTaskTemplate(element, pendingLi);
  }
});



function dragAndDrop() {
  [completedLi,pendingLi].forEach(element => {
    new Sortable(element, {
    animation: 200,
    ghostClass: 'gray-background-class',
});
  });
}
dragAndDrop()
