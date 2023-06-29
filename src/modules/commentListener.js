import getComments from './APIs/comments';

const buildCommentsList = (comments, commentsList) => {
  console.log(commentsList);
  if (comments.length > 0) {
    commentsList.innerHTML = comments
      .map(
        (comment) => `
          <li>
            <p><em>${new Date(comment.creation_date).toLocaleDateString()} 
            ${comment.username}</em> : ${comment.comment} </p>
          </li>
        `,
      )
      .join('');
  } else {
    commentsList.innerHTML = '<li>No comments yet</li>';
  }
  // Update the comments list on the popup
  const commentsListElement = document.getElementById(`comments-list-${pokemonID}`);
  commentsListElement.innerHTML = commentsList;
};

const sendComment = async (pokemonID) => {
  const commentForm = document.getElementById(`comment-form-${pokemonID}`);
  const usernameInput = commentForm.querySelector(`#username-${pokemonID}`);
  const commentInput = commentForm.querySelector(`#comment-${pokemonID}`);
  const errorElement = document.getElementById(`error-${pokemonID}`);

  if (usernameInput.value !== '' && commentForm.value !== '') {
    // POST Request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_id: pokemonID,
        username: usernameInput.value,
        comment: commentInput.value,
      }),
    };

    await fetch(`${urlInvolvementAPI}comments?item_id=${pokemonID}`, requestOptions);

    // GET request to update comment list ---------------------------------------------------
    getComments(pokemonID);

    // To clean the form -----------------------------------------------------------------
    commentForm.querySelector(`#username-${pokemonID}`).value = '';
    commentForm.querySelector(`#comment-${pokemonID}`).value = '';
  } else {
    const messages = [];
    if (usernameInput.value === '' && commentForm.value === '') {
      messages.push('Please enter a username and a comment.');
    } else if (commentForm.value === '' && usernameInput.value !== '') {
      messages.push('Please enter a username.');
    } else if (usernameInput.value === '' && commentForm.value !== '') {
      messages.push('Please enter a comment.');
    }

    if (messages.length > 0) {
      errorElement.innerText = messages.join(', ');
      setTimeout(() => {
        errorElement.remove();
      }, 3000);
    }
  }
};

const addCommentButtonListener = () => {
  const commentBtns = document.querySelectorAll('.comment-btn');
  const pokemonCards = document.querySelectorAll('.pokemon-card');
  const ClosepopupBtns = document.querySelectorAll('.close-popup');

  commentBtns.forEach((commentBtn) => {
    commentBtn.addEventListener('click', async (event) => {
      const cardId = event.target.closest('.pokemon-card').id;
      const popup = document.querySelector(`#popup-pk-${cardId}`);
      const commentListComponent = document.querySelector(
        `#comments-list-pk-${cardId}`,
      );

      const footer = document.querySelector('footer');
      pokemonCards.forEach((card) => {
        card.classList.add('hidden');
        footer.classList.toggle('hidden');
      });

      popup.classList.toggle('hidden');
      const comments = await getComments(cardId);
      buildCommentsList(comments, commentListComponent);
    });
  });

  ClosepopupBtns.forEach((closeBtn) => {
    closeBtn.addEventListener('click', (event) => {
      const popup = event.target.parentNode.parentNode;
      popup.classList.toggle('hidden');
      pokemonCards.forEach((card) => {
        card.classList.remove('hidden');
      });
    });
  });
};

export default addCommentButtonListener;