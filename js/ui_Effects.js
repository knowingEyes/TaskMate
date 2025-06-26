import { animate } from "./helper";
import { completedLi, innerPage, landingPage, pendingLi } from "./event";
import Sortable from "sortablejs";

const headerTexts = document.querySelectorAll(".header-label");

export function dragAndDrop() {
  [completedLi, pendingLi].forEach((element) => {
    new Sortable(element, {
      animation: 200,
      ghostClass: "gray-background-class",
    });
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
