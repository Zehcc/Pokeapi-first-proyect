window.onload = () => {
    init();
}

const init = async () => {
    goPokedex()
}

const goPokedex = () => {
    const main = document.querySelector('.main');
    removeAllChilds(main);
    main.innerHTML = `<div class="pokeapiDiv"><img class ="pokeapiIMG" src="https://avatars.githubusercontent.com/u/64151210?v=4" alt="letras pokemon"></div><div class="filterContent"><input class ="filterInput" id="filterInput" type="text" placeholder="Escribe aquí el nombre de un pokemon para saber mas sobre el"><button  onclick="getFiltered()">Filtrar</button><button  onclick="resetFilter()">Limpiar filtro</button></div><div><ul class="filteredPokemons"></ul></div><div><ul class="pokemons"></ul></div>"`
    getAllMapped();
}

const goLaboratorio = () => {
    const main = document.querySelector('.main');
    removeAllChilds(main);
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
            name: pokemon.name.toUpperCase(),
            image: pokemon.sprites.other.dream_world.front_default,
            height: pokemon.height / 10,
            weight: pokemon.weight / 10,
            number: pokemon.order
        }
    })
    mappedPokemons.forEach(pokemon => {
        const pokemonsList = document.querySelector(".pokemons")
        const pokemonCard = document.createElement('li');
        pokemonCard.className = "pokemonCard";
        pokemonCard.innerHTML = `<img src="${pokemon.image}" alt="${pokemon.name}"><h2 class="pokemonName">${pokemon.name}</h2><p class="mappedCardP">Altura: ${pokemon.height}m</p><p class="mappedCardP">Peso: ${pokemon.weight}kg</p><p class="mappedCardP"># ${pokemon.number}</p>`
        pokemonsList.appendChild(pokemonCard);
    });
}

const getFiltered = async () => {
    const pokemons = await getAllPokemons();
    const inputFilter = document.querySelector('#filterInput')
    const filteredPokemons = pokemons.filter(pokemon => (pokemon.name.toUpperCase() == inputFilter.value.toUpperCase()));
    filteredPokemons.forEach(pokemon => {
        const filteredList = document.querySelector(".filteredPokemons")
        const pokemonCard = document.createElement('li');
        const mappedStats = pokemon.stats.map(stat =>{
            return {
                statName: stat.stat.name,
                statValue: stat.base_stat
            }
        })
        pokemonCard.className = "filteredCard"
        pokemonCard.innerHTML = `<div class="filteredCardImg" ><img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}"></div><div class ="filteredUl"><ul class="filteredCardText${pokemon.name}"></ul></div>`
        filteredList.appendChild(pokemonCard);
        const filteredText = document.querySelector(`.filteredCardText${pokemon.name}`);
        for (const stat of mappedStats) {
            filteredText.innerHTML += `<li>${stat.statName.toUpperCase()} =>   ${stat.statValue}</li>`
           }
        const pokemonsList = document.querySelector(".pokemons");
        removeAllChilds(pokemonsList);       
    });
    inputFilter.value= '';
}

const removeAllChilds = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const resetFilter = () => {
    const filteredPokemons = document.querySelector(".filteredPokemons");
    removeAllChilds(filteredPokemons);
    getAllMapped();
}

