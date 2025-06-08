import { TransitionToInnerPage } from "./helper.js";

const getStartedBtn = document.querySelector("#getStartedBtn");
getStartedBtn.addEventListener("click", (e) => {
  TransitionToInnerPage(e);
});

