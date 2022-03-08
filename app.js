window.onload = () => {
    init();
    
}

const init = async () => {
    const pokemons = await getAllPokemons();
    const finalPokemons = await mappedPokemons(pokemons);
    console.log(finalPokemons)
    paintPokemons(finalPokemons);
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

const mappedPokemons = (pokemons) =>{
    const mapped = pokemons.map (pokemon => {
        return {
            name: pokemon.name,
            image: pokemon.sprites.front_shiny
        }
    })
    return mapped;
}
    
const paintPokemons = async (pokemons) => {
    pokemons.forEach(pokemon => {
        const pokemonsList = document.querySelector(".pokemons")
        const pokemonCard = document.createElement('li');
        const pokemonImg = document.createElement('img');
        const pokemonName = document.createElement('h4')
        pokemonImg.setAttribute("src",pokemon.image);
        pokemonName.textContent = pokemon.name;
        pokemonsList.appendChild(pokemonCard);
        pokemonCard.appendChild(pokemonImg);
        pokemonCard.appendChild(pokemonName)   
    });
}
