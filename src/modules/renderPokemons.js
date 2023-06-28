/* eslint-disable import/no-cycle */
import { getLikes } from "./APIs/likes.js";
import addLikeListener from "./likeListener.js";
import { getPokemonsData, getPokemonData } from "./APIs/pokemon.js";
import addCommentButtonListener from "./commentListener.js";

const section = document.querySelector("section.pokemon-cards");

// create pokemon card
const renderPokemonCard = ({
  name,
  url,
  likes,
  index,
  type,
  height,
  weight,
  ability,
}) => {
  console.log(name,height);
  return `
<div class="pokemon-card" id="${index + 1}">
  <img class="pokemon-card-image" src="${url}" alt="${name}" />
  <div class="pokemon-card-header">
    <h3>${name}</h3>
  </div>
  <div class="pokemon-card-body">
    <p></p>
  </div>
  <div class="pokemon-card-button">
    <div>
      <button class="like">
        <div style="background-color: transparent">
          <svg
            viewBox="0 0 17.503 15.625"
            height="20.625"
            width="20.503"
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
          >
            <path
              transform="translate(0 0)"
              d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z"
              id="Fill"
              fill="royalblue"
            ></path>
          </svg>
        </div>
      </button>
      <p class="pokemon-index-${index}">${likes}</p>
    </div>
    <button type="button" class="full-rounded comment-btn" id="comment">
      Comments
      <div class="border full-rounded"></div>
    </button>
  </div>
</div>
<div class="popup hidden" id="popup-pk-${index + 1}">
  <div class="popup-header">
    <h2>${name}</h2>
    <button class="close-popup">X</button>
  </div>
  <div class="popup-body">
    <img src="${url}" alt="${name}" />
    <div class="pokemon-info">
      <p><strong>Type:</strong> ${type}</p>
      <p><strong>Height:</strong> ${height}</p>
      <p><strong>Weight:</strong> ${weight}</p>
      <p><strong>Ability:</strong>${ability}</p>
    </div>
    <div class="comment-section">
      <h3>Comments</h3>
      <ul class="comments-list" id="comments-list-pk-${index + 1}"></ul>
      <form class="comment-form">
        <div class="comme">
          <div>
            <label for="username">Name:</label>
            <input type="text" id="username" required />
          </div>
          <div>
            <label for="comments">Comment:</label>
            <textarea id="Comments" rows="4" required></textarea>
          </div>
        </div>
        <button type="submit">Add Comments</button>
      </form>
    </div>
  </div>
</div>
`;
};


const displayPokemonCards = async (listOfPokemons, likesData) => {
  // Map over the list of Pokemons and add the corresponding likes data to each Pokemon object.
  const updatedPokemons = listOfPokemons.map((pokemon, index) => {
    const likes = likesData.find((data) => data.item_id === String(index + 1));
    return {
      ...pokemon,
      likes: likes ? likes.likes : 0,
      index,
    };
  });
  // Generate the HTML for each updated Pokemon card and join the resulting strings together.
  const pokemonDetail = updatedPokemons.map(renderPokemonCard).join("");
  // Insert the HTML string into the section element.
  section.innerHTML = pokemonDetail;
  addCommentButtonListener();
};

const pokemonCounter = (pokemons) => {
  const sampHeaderElement = document.querySelector("samp");
  sampHeaderElement.textContent = pokemons.length;
};

const renderPokemonCards = async (listOfPokemons) => {
  // Retrieve the list of likes data using the getLikes function.
  const likesData = await getLikes();

  displayPokemonCards(listOfPokemons, likesData);

  addLikeListener();
};

// Fetches data from the API and returns an array of pokemon data
const fetchPokemonData = async () => {
  try {
    const pokemonBaseData = await getPokemonsData();
    const promisesArray = pokemonBaseData.map(async ({ url }) =>
      getPokemonData(url)
    );
    const urlsImgArray = await Promise.all(promisesArray);
    console.log(urlsImgArray);
    const pokemonArray = pokemonBaseData.map(({ name }, i) => ({
      name,
      url: urlsImgArray[i].sprites.front_default,
      height: urlsImgArray[i].height,
      weight: urlsImgArray[i].weight,
      ability: urlsImgArray[i].abilities[0].ability.name,
      type: urlsImgArray[i].types[0].type.name,
    }));
    console.log(pokemonArray);
    return pokemonArray;
  } catch (error) {
    return [];
  }
};

// Define main function
const main = async () => {
  const listOfPokemons = await fetchPokemonData();
  renderPokemonCards(listOfPokemons);
  pokemonCounter(listOfPokemons);
};

export default main;