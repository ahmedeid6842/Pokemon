import renderPokemonCard from "./renderPokemons";
import { postLike } from "./APIs/likes";

const handleLikeButtonClick = async (event) => {
  const pokemonID = event.target.closest(".pokemon-card").getAttribute("id");
  await postLike(pokemonID);
  await renderPokemonCard();
};

const addLikeButtonListeners = () => {
  const likeButtons = document.querySelectorAll(".like");
  likeButtons.forEach((button) => {
    button.addEventListener("click", handleLikeButtonClick);
  });
};

export default addLikeButtonListeners;
