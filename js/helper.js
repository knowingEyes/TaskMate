export function TransitionToInnerPage(e) {
  e.classList.add("fadeOut");
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
