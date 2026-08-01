const urlBase = 'https://pokeapi.co/api/v2/pokemon';
const pokedexContainer = document.getElementById('pokedex1');

// 1. Buscar a lista inicial de Pokémons (ex: 15 primeiros)
async function carregarPokemons() {
    try {
        const response = await fetch(`${urlBase}?limit=15&offset=0`);
        const data = await response.json();
        
        // Data.results contém uma lista de objetos com name e url
        // Usamos forEach para iterar pela lista
        data.results.forEach(pokemon => {
            buscarDetalhesPokemon(pokemon.url);
        });
    } catch (error) {
        console.error('Erro ao carregar a lista:', error);
    }
}

// 2. Buscar os dados detalhados de cada Pokémon (imagem, nome, etc)
async function buscarDetalhesPokemon(url) {
    try {
        const response = await fetch(url);
        const pokemon = await response.json();
        
        criarCardPokemon(pokemon);
    } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
    }
}

// 3. Criar o HTML para exibir na tela
function criarCardPokemon(poke) {
    const card = document.createElement('pokedex1');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${poke.sprites.front_default}" alt="${poke.name}">
        <h3>${poke.name}</h3>
        <p>ID: ${poke.id}</p>
    `;

    pokedexContainer.appendChild(card);
}

// Inicializar a função
carregarPokemons();