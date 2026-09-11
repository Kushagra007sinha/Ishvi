const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

document.querySelectorAll(".photo-card img").forEach((image) => {
  const showPlaceholder = () => {
    image.closest(".photo-card").classList.add("is-placeholder");
  };

  image.addEventListener("error", showPlaceholder);

  if (image.complete && image.naturalWidth === 0) {
    showPlaceholder();
  }
});

const revealElements = document.querySelectorAll(".reveal");

if (reducedMotion) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 110}ms`;
    observer.observe(element);
  });

  const progressBar = document.querySelector(".progress span");

  const updateProgress = () => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    progressBar.style.width = `${
      scrollableHeight ? (window.scrollY / scrollableHeight) * 100 : 0
    }%`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}