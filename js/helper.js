
export function TransitionToInnerPage(e) {
  let landing = e.target.closest("#landingPage");
  landing.classList.add("fadeOut");
  landing.addEventListener("animationend", () => {
    landing.remove();
  });
}