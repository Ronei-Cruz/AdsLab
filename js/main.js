const filterButtons = document.querySelectorAll(".filter-btn");
const comparisonCards = document.querySelectorAll(".comparison-card");
const accordionItems = document.querySelectorAll(".accordion-item");

/* const highlightConfig = {
  all: () => true,
  preco: (card) =>
    card.textContent.includes("R$ 2.069,10") ||
    card.textContent.includes("Preço:"),
  performance: (card) => card.textContent.includes("9.6/10"),
  durabilidade: (card) => card.textContent.includes("12 horas de uso contínuo"),
  nota: (card) => card.textContent.includes("4.7/5"),
}; */

const highlightConfig = {
  all: () => true,
  preco: (card) => {
    // Encontra o card com o menor preço
    const precoMatch = card.textContent.match(/R\$ ([\d\.]+),(\d+)/);
    if (!precoMatch) return false;
    const precoCard = parseFloat(precoMatch[1].replace(/\./g, '') + '.' + precoMatch[2]);
    
    const precos = [];
    document.querySelectorAll('.comparison-card').forEach(c => {
      const match = c.textContent.match(/R\$ ([\d\.]+),(\d+)/);
      if (match) {
        precos.push(parseFloat(match[1].replace(/\./g, '') + '.' + match[2]));
      }
    });
    
    return precoCard === Math.min(...precos);
  },
  performance: (card) => {
    // Encontra o card com maior performance
    const perfMatch = card.textContent.match(/Performance:\s*([\d.]+)\/10/);
    if (!perfMatch) return false;
    const perfCard = parseFloat(perfMatch[1]);
    
    const performances = [];
    document.querySelectorAll('.comparison-card').forEach(c => {
      const match = c.textContent.match(/Performance:\s*([\d.]+)\/10/);
      if (match) {
        performances.push(parseFloat(match[1]));
      }
    });
    
    return perfCard === Math.max(...performances);
  },
  durabilidade: (card) => {
    // Encontra o card com maior duração de bateria
    const batMatch = card.textContent.match(/(\d+)\s*horas de uso/);
    if (!batMatch) return false;
    const batCard = parseInt(batMatch[1]);
    
    const baterias = [];
    document.querySelectorAll('.comparison-card').forEach(c => {
      const match = c.textContent.match(/(\d+)\s*horas de uso/);
      if (match) {
        baterias.push(parseInt(match[1]));
      }
    });
    
    return batCard === Math.max(...baterias);
  },
  nota: (card) => {
    // Encontra o card com maior nota
    const notaMatch = card.textContent.match(/([\d.]+)\/5/);
    if (!notaMatch) return false;
    const notaCard = parseFloat(notaMatch[1]);
    
    const notas = [];
    document.querySelectorAll('.comparison-card').forEach(c => {
      const match = c.textContent.match(/([\d.]+)\/5/);
      if (match) {
        notas.push(parseFloat(match[1]));
      }
    });
    
    return notaCard === Math.max(...notas);
  }
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
