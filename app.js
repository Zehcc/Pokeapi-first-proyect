window.onload = () => {
    init();
}

const init = async () => {
    getAllMapped();
}

const getPokemon = async (id) => {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const resultjs = await result.json();
    return resultjs
}
const getAllPokemons = async () =>{
    const allPokemons = [];
    for (i=1; i<=151; i++) {
    const pokemon =  await getPokemon(i);
    allPokemons.push(pokemon)
    }
    return allPokemons;
}

const getAllMapped = async () => {
    const pokemons = await getAllPokemons ();
    const mappedPokemons = pokemons.map (pokemon => {
        return {
            name: pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default
        }
    })
    mappedPokemons.forEach(pokemon => {
        const pokemonsList = document.querySelector(".pokemons")
        const pokemonCard = document.createElement('li');
        pokemonCard.className = "pokemonCard"
        const pokemonImg = document.createElement('img');
        const pokemonName = document.createElement('h4')
        pokemonImg.setAttribute("src",pokemon.image);
        pokemonName.textContent = pokemon.name;
        pokemonsList.appendChild(pokemonCard);
        pokemonCard.appendChild(pokemonImg);
        pokemonCard.appendChild(pokemonName)   
    });
}


const getFiltered = async () => {
    const pokemons = await getAllPokemons();
    const inputFilter = document.querySelector('#filterInput')
    const filteredPokemons = pokemons.filter(pokemon => (pokemon.name == inputFilter.value));
    filteredPokemons.forEach(pokemon => {
        const filteredList = document.querySelector(".filteredPokemons")
        const pokemonCard = document.createElement('li');
        pokemonCard.className = "filteredCard"
        const pokemonImg = document.createElement('img');
        const pokemonName = document.createElement('h4')
        pokemonImg.setAttribute("src",pokemon.sprites.front_shiny);
        pokemonName.textContent = pokemon.name;
        filteredList.appendChild(pokemonCard);
        pokemonCard.appendChild(pokemonImg);
        pokemonCard.appendChild(pokemonName);
        const pokemonsList = document.querySelector(".pokemons");
        removeAllChilds(pokemonsList);       
    });
}

function removeAllChilds(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
const resetFilter = () => {
    const filteredPokemons = document.querySelector(".filteredPokemons");
    removeAllChilds(filteredPokemons);
    getAllMapped();
}