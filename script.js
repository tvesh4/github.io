const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
const blogCards = Array.from(document.querySelectorAll(".blog-card"));

if (filterButtons.length && blogCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((node) => node.classList.remove("active"));
      button.classList.add("active");
      const selected = button.getAttribute("data-filter");

      blogCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const show = selected === "all" || category === selected;
        card.style.display = show ? "block" : "none";
      });
    });
  });
}

const progressBar = document.getElementById("scrollProgress");
const panels = Array.from(document.querySelectorAll("[data-parallax]"));

const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  panels.forEach((panel) => {
    const speed = Number(panel.getAttribute("data-parallax")) || 0;
    const y = window.scrollY * speed;
    panel.style.setProperty("--parallax", String(-y));
  });
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const revealNodes = Array.from(document.querySelectorAll(".reveal"));
if (revealNodes.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.14 }
  );

  revealNodes.forEach((node) => observer.observe(node));
}
