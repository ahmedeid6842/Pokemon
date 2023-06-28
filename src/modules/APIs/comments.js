const involvementURL =
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8ev0fUwJNQWCM4y1a4xa/comments";

export const getComments = async (pokemonID) => {
  try {
    const response = await fetch(involvementURL + `/?item_id=${pokemonID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};