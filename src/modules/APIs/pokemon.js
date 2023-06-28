const urlAPI = "https://pokeapi.co/api/v2/pokemon/";

export const getPokemonsData = async () => {
  const response = await fetch(urlAPI);
  const data = await response.json();
  return data.results;
};

export const getPokemonData = async (pokemonUrl) => {
  const response = await fetch(pokemonUrl);
  const data = await response.json();
  return data;
};
