const listEl = document.getElementById("pokemonList");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const sortSelect = document.getElementById("sortSelect");
const searchBtn = document.getElementById("searchBtn");

function renderPokemons(data) {
  listEl.innerHTML = "";
  data.forEach(p => {
    const card = document.createElement("div");
    card.className = "pokemon-card";
    card.innerHTML = `
      <div class="card-header">
        <span class="id">${p.id}</span>
        <h3>${p.name}</h3>
      </div>
      <img src="${p.img}" alt="${p.name}">
      <div class="info">
        <p class="type">${p.type.join(" / ")}</p>
        <p><b>Candy count:</b> ${p.candy ?? "undefined"}</p>
        <p><b>Weight:</b> ${p.weight}</p>
        <p><b>Weaknesses:</b> ${p.weaknesses.join(", ")}</p>
      </div>
    `;
    listEl.appendChild(card);
  });
}

function filterAndSort() {
  let value = searchInput.value.toLowerCase();
  let type = typeFilter.value;
  let sort = sortSelect.value;

  let result = pokemons.filter(p =>
    p.name.toLowerCase().includes(value) &&
    (type === "all" || p.type.includes(type))
  );

  if (sort === "az") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "za") {
    result.sort((a, b) => b.name.localeCompare(a.name));
  }

  renderPokemons(result);
}

searchBtn.addEventListener("click", filterAndSort);
searchInput.addEventListener("keyup", filterAndSort);
typeFilter.addEventListener("change", filterAndSort);
sortSelect.addEventListener("change", filterAndSort);

renderPokemons(pokemons);
