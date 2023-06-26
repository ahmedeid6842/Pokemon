import { getPokemonsData, getPokemonData } from './APIs/pokemon.js';

const section = document.querySelector('section.pokemon-cards');

// create pokemon card
const renderPokemonCard = ({ name, url }) => `
  <div class="pokemon-card">
    <img class="pokemon-card-image" src="${url}" alt="${name}">
    <div class="pokemon-card-header">
      <h3>${name}</h3>
    </div>
    <div class="pokemon-card-body">
      <p></p>
    </div>
    <div class="pokemon-card-button">
      <button class="like">
      <div style="background-color: transparent;">
        <svg viewBox="0 0 17.503 15.625" height="20.625" width="20.503" xmlns="http://www.w3.org/2000/svg" class="icon">
            <path transform="translate(0 0)" d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z" id="Fill" fill="royalblue"></path>
        </svg>
     </div>
      </button>
      <button type="button" class="full-rounded" id="comment">Comments<div class="border full-rounded"></div></button>
    </div>
  </div>
`;

// Renders an array of pokemon cards
const renderPokemonCards = (listOfPokemons) => {
  const pokemonDetail = listOfPokemons.map(renderPokemonCard).join('');
  section.innerHTML = pokemonDetail;
};

// Fetches data from the API and returns an array of pokemon data
const fetchPokemonData = async () => {
  try {
    const pokemonBaseData = await getPokemonsData();
    const promisesArray = pokemonBaseData.map(async ({ url }) => getPokemonData(url));
    const urlsImgArray = await Promise.all(promisesArray);
    const pokemonArray = pokemonBaseData.map(({ name }, i) => ({
      name,
      url: urlsImgArray[i],
    }));

    return pokemonArray;
  } catch (error) {
    return [];
  }
};

// Define main function ------------------------------------------------------------------------
const main = async () => {
  const listOfPokemons = await fetchPokemonData();
  renderPokemonCards(listOfPokemons);
};

export default main;
