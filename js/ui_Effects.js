import { animate } from "./helper";
import Typed from "typed.js";
import { savedUsername } from "./main";

animate(".logoCon", { delay: 200, reset: false });
animate("#title", { delay: 0 });
animate("#subtitle", { delay: 100 });
animate("#getStartedBtn", { origin: "bottom", delay: 200 });
animate(".left", { delay: 0, distance: "60px", origin: "left" });
animate(".right", { delay: 100, distance: "60px", origin: "right" });
animate(".leftLast", { delay: 200, distance: "60px", origin: "left" });

export function enableTypingEffect(userInput) {
  new Typed(".greeting", {
    strings: [`${userInput}`],
    typeSpeed: 50,
    backSpeed: 25,
    loopCount: 3,
    loop: true,
    showCursor: false,
  });
}
