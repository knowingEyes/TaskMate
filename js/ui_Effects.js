import ScrollReveal from "scrollreveal";
import { completedLi, pendingLi } from "./event";
import Sortable from "sortablejs";

export function dragAndDrop() {
  [completedLi, pendingLi].forEach((element) => {
    new Sortable(element, {
      animation: 200,
      ghostClass: "gray-background-class",
    });
  });
}
dragAndDrop();

function animate(el, obj = {}) {
    ScrollReveal().reveal(el,  { 
    origin : "top",
    distance: "20px",
    duration :"500",
    opacity: 0,
    easing : "ease-out",
    reset: true,
    mobile: true,
    cleanup : true,
    ...obj,
});
}
animate(".logoCon", {delay : 100,reset : false})
animate("#title", {delay : 0})
animate("#subtitle", {delay : 100})
animate("#getStartedBtn", {origin : "bottom",delay : 200})
animate(".left", {delay : 0, distance : "60px", origin : "left"})
animate(".right", {delay : 100, distance : "60px", origin : "right"})
animate(".leftLast", {delay : 200, distance : "60px", origin : "left"})

