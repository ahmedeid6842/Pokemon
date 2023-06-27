const involvementURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8ev0fUwJNQWCM4y1a4xa/likes/';

export const getLikes = async () => {
  const response = await fetch(involvementURL);
  const data = await response.json();
  return data;
};

export const postLike = async (pokemonID) => {
  const body = JSON.stringify({ item_id: pokemonID });
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  };
  await fetch(involvementURL, options);
};

