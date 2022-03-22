let allPokemons = [];

window.onload = () => {
    init();
}

const init = async () => {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loadingDiv';
    loadingDiv.innerHTML = '<img class="loadingIMG" src="https://i.gifer.com/origin/6d/6d067d7dd323a4cbc792f280968cd641.gif" alt="loading">';
    const main = document.querySelector('main');
    main.appendChild(loadingDiv);
    await getAllPokemons();
    document.querySelector('.loadingDiv').remove();
    paintAllPokemons();
}

const getPokemon = async (id) => {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const resultjs = await result.json();
    return resultjs
}

const getAllPokemons = async () =>{
    for (i=1; i<=151; i++) {
    const pokemon =  await getPokemon(i);
    allPokemons.push(pokemon)
    }
}

const paintAllPokemons = () => {
    const mappedPokemons = allPokemons.map (pokemon => {
        return {
            name: pokemon.name.toUpperCase(),
            image: pokemon.sprites.other.dream_world.front_default,
            height: pokemon.height / 10,
            weight: pokemon.weight / 10,
            number: pokemon.order
        }
    })
    const allPokemonsDiv = document.createElement('div');
    allPokemonsDiv.className = 'allPokemonsDiv';
    const allPokemonsList = document.createElement('ul');
    allPokemonsList.className = 'pokemons';
    mappedPokemons.forEach(pokemon => {
    allPokemonsList.innerHTML += `<li class="pokemonCard"><img src="${pokemon.image}" alt="${pokemon.name}"><h2 class="pokemonName">${pokemon.name}</h2><p class="mappedCardP">Altura: ${pokemon.height}m</p><p class="mappedCardP">Peso: ${pokemon.weight}kg</p><p class="mappedCardP"># ${pokemon.number}</p></li>`
    });
    document.querySelector('main').appendChild(allPokemonsDiv).appendChild(allPokemonsList);
}

const getFiltered =  () => {
    const inputFilter = document.querySelector('#filterInput');
    const filteredPokemons = allPokemons.filter(pokemon => ( pokemon.name.toUpperCase().includes(inputFilter.value.toUpperCase())));
    const pokemonsList = document.querySelector(".pokemons");
    if (pokemonsList !== null) {
        pokemonsList.remove();
    }
    if (document.querySelector(".filteredTypeDiv") !== null) {
        document.querySelector(".filteredTypeDiv").remove();
    }
    let filteredList = document.querySelector(".filteredPokemons");
    if (filteredList !== null) {
        removeAllChilds(filteredList);
    }
    if (filteredPokemons.length == 0) {
        alert(`¡${inputFilter.value.toUpperCase()} no esta en la lista!`)
        paintAllPokemons();
    } else {
        filteredPokemons.forEach(pokemon => {
            if (filteredList == null){
                const filteredPokemons = document.createElement('ul');
                filteredPokemons.className = "filteredPokemons";
                const main = document.querySelector('.pokedexMain');
                main.appendChild(filteredPokemons);
                filteredList = document.querySelector(".filteredPokemons");
            }
            if (document.querySelector(`.filteredCardText${pokemon.name}`) == null){
            filteredList.innerHTML += `<li class="filteredCard"><div class="filteredCardImg" ><img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}"></div><div class ="filteredUl"><ul class="filteredCardText${pokemon.name}"></ul></div></li>`
            const filteredText = document.querySelector(`.filteredCardText${pokemon.name}`);
            const mappedStats = pokemon.stats.map(stat =>{
                return {
                    statName: stat.stat.name,
                    statValue: stat.base_stat
                }
            })
            for (const stat of mappedStats) {
                filteredText.innerHTML += `<li>${stat.statName.toUpperCase()} =>   ${stat.statValue}</li>`
            }
            }   
        });
    }   
    inputFilter.value= '';
}

const getFilteredByType =  (param) => {
    if(document.querySelector('.allPokemonsDiv') !== null){
        document.querySelector('.allPokemonsDiv').remove()
    }
    if((document.querySelector('.filteredTypeDiv') == null)){
        const createTypeDiv = document.createElement('div');
        createTypeDiv.className = 'filteredTypeDiv';
        const main = document.querySelector('main');
        main.appendChild(createTypeDiv);
    }
    removeAllChilds((document.querySelector('.filteredTypeDiv')));
    const typeTitle = document.createElement('h3');
    typeTitle.className = `title${param}`
    typeTitle.innerHTML = `Pokemons tipo: ${param}`;
    document.querySelector('.filteredTypeDiv').appendChild(typeTitle)
    const filteredTypeList = document.createElement('ul');
    filteredTypeList.className = 'pokemons';
    for (const pokemon of allPokemons) {
        for (const type of pokemon.types) {
            if (type.type.name == param) {      
                filteredTypeList.innerHTML += `<li class="pokemonCard${type.type.name}"><img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}"><h2 class="pokemonName">${pokemon.name.toUpperCase()}</h2></li>`
                const filteredTypeDiv = document.querySelector('.filteredTypeDiv')
                filteredTypeDiv.appendChild(filteredTypeList);
            }
        }
    }
}

const removeAllChilds = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const resetFilter = () => {
    if (document.querySelector(".filteredPokemons") !== null) {
        document.querySelector(".filteredPokemons").remove();
    }
    if (document.querySelector(".filteredTypeDiv") !== null) {
        document.querySelector(".filteredTypeDiv").remove();
    }
    paintAllPokemons();
}

