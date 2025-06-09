export function TransitionToInnerPage(e) {
  let landing = e.target.closest("#landingPage");
  landing.classList.add("fadeOut");
  landing.addEventListener("animationend", () => {
    landing.remove();
  });
}

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
