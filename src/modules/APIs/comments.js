const involvementURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8ev0fUwJNQWCM4y1a4xa/comments';

const getComments = async (pokemonID) => {
  try {
    const response = await fetch(`${involvementURL}/?item_id=${pokemonID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

export const postcommint = async (pokemonID, username, comment) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item_id: pokemonID,
      username,
      comment,
    }),
  };
  await fetch(`${involvementURL}?item_id=${pokemonID}`, requestOptions);
};
export default getComments;
