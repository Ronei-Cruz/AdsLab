const filterButtons = document.querySelectorAll(".filter-btn");
const comparisonCards = document.querySelectorAll(".comparison-card");
const accordionItems = document.querySelectorAll(".accordion-item");

const highlightConfig = {
  all: () => true,
  preco: (card) =>
    card.textContent.includes("R$ 3.799") ||
    card.textContent.includes("Preço:"),
  performance: (card) => card.textContent.includes("9.6/10"),
  durabilidade: (card) => card.textContent.includes("12h de tela"),
  nota: (card) => card.textContent.includes("4.8/5"),
};

function activateFilter(filterKey) {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.criteria === filterKey);
  });

  comparisonCards.forEach((card) => {
    card.classList.remove("filtered");
    if (filterKey === "all") return;
    const match = highlightConfig[filterKey](card);
    if (!match) {
      card.classList.add("filtered");
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateFilter(button.dataset.criteria);
  });
});

accordionItems.forEach((item, index) => {
  const panel = item.nextElementSibling;
  if (index === 0) {
    item.classList.add("active");
    panel.style.maxHeight = panel.scrollHeight + "px";
  }

  item.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    accordionItems.forEach((other) => {
      other.classList.remove("active");
      const otherPanel = other.nextElementSibling;
      otherPanel.style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("active");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

window.addEventListener("resize", () => {
  accordionItems.forEach((item) => {
    const panel = item.nextElementSibling;
    if (item.classList.contains("active")) {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});
