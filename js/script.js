function mudarPainel(containerHome, containerFavorite) {
    document.getElementById(containerFavorite).classList.add('hide');
    
    document.getElementById(containerHome).classList.remove('hide');
  }

const btnFavorite = document.querySelectorAll(".favorite");

btnFavorite.forEach((btnFavorite) => {

const pokemonEdicao = {
    id: btnFavorite.getAttribute("data-id"),
    name: btnFavorite.getAttribute("data-name"),
    image: btnFavorite.getAttribute("data-image"),
    type1: btnFavorite.getAttribute("data-type1"),
    type2: btnFavorite.getAttribute("data-type2")
  };

let pokemonsFavoritos =  JSON.parse(localStorage.getItem("pokemonsFavoritos")) || [];

const jaEfavorito = pokemonsFavoritos.some(pokemon => pokemon.name === pokemonEdicao.name);
// const textPadrao = 'Adicionar aos favoritos';
// const newText = '⭐ Pokémon Favoritado!'

if (jaEfavorito) {
  btnFavorite.classList.add("favorito");
  btnFavorite.innerText = "⭐ Pokémon Favoritado!";
}

// btnFavorite.addEventListener("click",function() {
//     btnFavorite.textContent = newText

//     setTimeout(function() {
//       btnFavorite.textContent = textPadrao;
//     }, 1000)
//   })

btnFavorite.addEventListener("click", () => {
  pokemonsFavoritos = JSON.parse(localStorage.getItem("pokemonsFavoritos")) || [];

  const index = pokemonsFavoritos.findIndex(pokemon => pokemon.name === pokemonEdicao.name);

  if (index !== -1) {
    pokemonsFavoritos.splice(index, 1);
    btnFavorite.classList.remove("favorito");
    btnFavorite.innerText = "Adicionar aos favoritos";
  } else {
    pokemonsFavoritos.push(pokemonEdicao);
    btnFavorite.classList.add("favorito");
    btnFavorite.innerText = "⭐ Pokémon Favoritado!";
  }

localStorage.setItem("pokemonsFavoritos", JSON.stringify(pokemonsFavoritos));


if (typeof renderizarFavoritos === "function") {
      renderizarFavoritos();
    }
})
})


document.addEventListener("DOMContentLoaded", () => {
  const containerList = document.getElementById("container-favorite");

  window.renderizarFavoritos = function() {
    if (!containerLista) return;
   }

  function renderizarFavoritos() {

    const pokemonsFavoritos = JSON.parse(localStorage.getItem("pokemonsFavoritos")) || [];

    containerList.innerHTML = "";

    if (pokemonsFavoritos.length === 0) {
      containerLista.innerHTML = "<p>Nenhum Pokémon favoritado ainda. Vá capturar alguns!</p>";
      return;
    }

    pokemonsFavoritos.forEach(pokemon => {
      const tagType2 = pokemon.type2 && pokemon.type2 !== "null" ? `<span class="${pokemon.type2}">${pokemon.type2}</span>` : '';
      const cardHTML = `
       
        <li class="container-pokemon" data-id="${pokemon.id}">
                    <div>
                        <h2>${pokemon.name}</h2>
                    </div>
                    <a href="">
                        <img class="img-pokemon" src="${pokemon.image}" alt="${pokemon.name}">
                    </a>
                    <span class="type-name">Tipo</span>
                    <div class="type">
                        <span class="${pokemon.type1}">${pokemon.type1}</span>
                        ${tagType2}
                    </div>
                    <div class="div-btn">
                        <button class="btn-remover" data-id="${pokemon.id}">💔 Remover</button>
                    </div>
                </li>
      `;
      
      containerList.innerHTML += cardHTML;
    });

    configurarBotoesRemover();
  }

  function configurarBotoesRemover() {
    const btnRemover = document.querySelectorAll(".btn-remover");

    btnRemover.forEach(botao => {
      botao.addEventListener("click", (evento) => {
        const idParaRemover = evento.target.getAttribute("data-id");
        
        let pokemonsFavoritos = JSON.parse(localStorage.getItem("pokemonsFavoritos")) || [];
        
        pokemonsFavoritos = pokemonsFavoritos.filter(poke => poke.id !== idParaRemover);
        
        localStorage.setItem("pokemonsFavoritos", JSON.stringify(pokemonsFavoritos));
        
        renderizarFavoritos();
        atualizarBtnPrincipal()
      });
    });
  }

  function atualizarBtnPrincipal() {
    const pokemonsFavoritos = JSON.parse(localStorage.getItem("pokemonsFavoritos"))||[];
    btnFavorite.forEach(btn => {
      const name = btn.getAttribute("data-name");
      const jaEfavoritos = pokemonsFavoritos.some(pokemon => pokemon.name === name)

      if(jaEfavoritos) {
        btn.classList.add("favorito");
        btn.innerText = "⭐ Pokémon Favoritado!"
      } else {
        btn.classList.remove("favorito");
        btn.innerText = "Adicionar aos favoritos"
      }
    })
  }

  renderizarFavoritos();
});