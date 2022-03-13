window.onload = () => {
    init();
}

const init = async () => {
    goPokedex()
}

const goPokedex = () => {
    const body = document.querySelector('body');
    body.className = 'pokedexBody';
    removeAllChilds(body);
    body.innerHTML = `<header class="header"></header><main class="pokedexMain"></main>`
    createNav();
    pokedexMain();
    getAllMapped();
}

const goLaboratory = () => {
    const body = document.querySelector('body');
    body.className = 'laboratoryBody';
    removeAllChilds(body);
    body.innerHTML = `<header class="header"></header><main class="laboratoryMain"></main>`
    createNav();
    labolatoryMain();
}

const goMinigame = () => {
    const body = document.querySelector('body');
    body.className = 'minigameBody';
    removeAllChilds(body);
    body.innerHTML = `<header class="header"></header><main class="minigameMain"></main>`
    createNav();
    minigameMain();
}

const createNav = () => {
    const navBar = document.querySelector('.header');
    navBar.innerHTML = 
    `<nav>
        <ul class="navigation">
            <button onclick="goPokedex()" class="navigation_button">Pokedex</button>
            <button onclick="goLaboratory()" class="navigation_button">Laboratorio</button>
            <button <button onclick="goMinigame()"class="navigation_button">Minijuego</button>
        </ul>
    </nav>`
}

const pokedexMain = () => {
    const main = document.querySelector('main');
    main.innerHTML = 
    `<div class="pokeapiDiv">
        <img class ="pokeapiIMG" src="https://avatars.githubusercontent.com/u/64151210?v=4" alt="letras pokemon">
    </div>
    <div class="filterContent">
        <input class ="filterInput" id="filterInput" type="text" placeholder="Escribe aquí el nombre de un pokemon para saber mas sobre el">
        <button  onclick="getFiltered()">Filtrar</button>
        <button  onclick="resetFilter()">Limpiar filtro</button>
    </div>`
}

const labolatoryMain = () =>{
    const main = document.querySelector('main');
    main.innerHTML = 
    `<div class="todoDiv">
        <h1 class="laboratoryTitle">TO DO LIST</h1>
        <input class="toDoInput" type="text">
        <button onclick="toDoItem()" class="laboratoryButton">Apuntar</button>
        <ul class="toDoList"></ul>
    </div>`;
}

/* const minigameMain = () => {
    const main = document.querySelector('main');
    main.innerHTML = 
        `<h1>Whack A Mole</h1>
	    <h2>your score: </h2>
	    <h2 class="score">0</h2>
	    <div>Seconds left:</div>
	    <h2 id="time-left">60</h2>
        <button onclick="startGame()"
	    <div class="grid">
		    <div class="square" id="1"></div>
		    <div class="square mole" id="2"></div>
		    <div class="square" id="3"></div>
		    <div class="square" id="4"></div>
		    <div class="square" id="5"></div>
		    <div class="square" id="6"></div>
		    <div class="square" id="7"></div>
		    <div class="square" id="8"></div>
		    <div class="square" id="9"></div>
	    </div>`
} */

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
    const allPokemonsDiv = document.createElement('div');
    const allPokemonsList = document.createElement('ul');
    allPokemonsList.className = 'pokemons'
    mappedPokemons.forEach(pokemon => {
    allPokemonsList.innerHTML += `<li class="pokemonCard"><img src="${pokemon.image}" alt="${pokemon.name}"><h2 class="pokemonName">${pokemon.name}</h2><p class="mappedCardP">Altura: ${pokemon.height}m</p><p class="mappedCardP">Peso: ${pokemon.weight}kg</p><p class="mappedCardP"># ${pokemon.number}</p></li>`
    });
    const main = document.querySelector('main');
    main.appendChild(allPokemonsDiv).appendChild(allPokemonsList);
   
}

const getFiltered = async () => {
    const pokemons = await getAllPokemons();
    const inputFilter = document.querySelector('#filterInput');
    const filteredPokemons = pokemons.filter(pokemon => (pokemon.name.toUpperCase() == inputFilter.value.toUpperCase()));
    filteredPokemons.forEach(pokemon => {
        let filteredList = document.querySelector(".filteredPokemons");
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
        const pokemonsList = document.querySelector(".pokemons");
        removeAllChilds(pokemonsList);
        }      
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

const toDoItem = () => {
    const inputText = document.querySelector('.toDoInput')
    const toDoListItem = document.createElement('li');
    toDoListItem.innerHTML = `<p class="toDoListText">${inputText.value}</p>`
    let removeLastButton = document.createElement('button');
    removeLastButton.textContent = 'X';
    removeLastButton.addEventListener('click', () => removeLast(toDoListItem));
    const toDoList = document.querySelector('.toDoList');
    toDoList.appendChild(toDoListItem);
    toDoListItem.appendChild(removeLastButton);
    inputText.value = "";
}

const removeLast = (item) => {
    item.remove();
}

/* const startGame = () => {
const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeleft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let results = 0;
let currentTime = timeleft.textContent;

function randomSquare(){
	square.forEach( className => {
		className.classList.remove('mole');
	});
	let randomPosition = square[Math.floor(Math.random() * 9)];
	randomPosition.classList.add('mole');

	hitPosition = randomPosition.id;
}

square.forEach( id => {
	id.addEventListener('mouseup', () => {
		if(id.id === hitPosition){
			results = results + 1;
			score.textContent = results;
		}
	});
});

function moveMole(){
	let timerId=null;
	timerId = setInterval(randomSquare, 1000);
}

moveMole();

function countDown(){
	currentTime--;
	timeleft.textContent = currentTime;
	if(currentTime===0){
		clearInterval(timerId);
		alert('Game Over! your final score is: '+ results);
	}
}


let timerId = setInterval(countDown, 1000);
} */