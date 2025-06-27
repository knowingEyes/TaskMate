import { animate } from "./helper";
import { completedLi, innerPage, landingPage, pendingLi } from "./event";
import Sortable from "sortablejs";
import { Tasks } from "./task";
import { saveToLocalStorage } from "./localstorage";

const headerTexts = document.querySelectorAll(".header-label");

export function dragAndDrop() {
  new Sortable(pendingLi, {
    animation: 250,
    ghostClass: "ghost",
    swapThreshold: 0.65,
    onEnd: function (evt) {
      const movedTask = Tasks.splice(evt.oldIndex, 1)[0];
      Tasks.splice(evt.newIndex, 0, movedTask);
      saveToLocalStorage("tasks", Tasks);
    },
  });
}
dragAndDrop();

animate(".logoCon", { delay: 200, reset: false });
animate("#title", { delay: 0 });
animate("#subtitle", { delay: 100 });
animate("#getStartedBtn", { origin: "bottom", delay: 200 });
animate(".left", { delay: 0, distance: "60px", origin: "left" });
animate(".right", { delay: 100, distance: "60px", origin: "right" });
animate(".leftLast", { delay: 200, distance: "60px", origin: "left" });
