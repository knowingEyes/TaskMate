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

