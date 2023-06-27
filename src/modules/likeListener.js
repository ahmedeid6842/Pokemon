/* eslint-disable import/no-cycle */

import { postLike } from './APIs/likes.js';
import renderPokemonCard from './renderPokemons.js';

const handleLikeButtonClick = async (event) => {
  const pokemonID = event.target.closest('.pokemon-card').getAttribute('id');
  await postLike(pokemonID);
  await renderPokemonCard();
};

const addLikeButtonListeners = () => {
  const likeButtons = document.querySelectorAll('.like');
  likeButtons.forEach((button) => {
    button.addEventListener('click', handleLikeButtonClick);
  });
};

export default addLikeButtonListeners;