import getComments, { postcommint } from './APIs/comments';

const buildCommentsList = (comments, commentsList) => {
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
};

const sendComment = async (pokemonID) => {
  const commentForm = document.getElementById(`comment-form-${pokemonID}`);
  const usernameInput = commentForm.querySelector(`#username-pk-${pokemonID}`);
  const commentInput = commentForm.querySelector(`#comment-pk-${pokemonID}`);
  const commentListComponent = document.querySelector(
    `#comments-list-pk-${pokemonID}`,
  );

  const errorElement = document.getElementById(`error-${pokemonID}`);
  if (usernameInput.value !== '' && commentInput.value !== '') {
    await postcommint(pokemonID, usernameInput.value, commentInput.value);
    const comments = await getComments(pokemonID);
    buildCommentsList(comments, commentListComponent);
    usernameInput.value = '';
    commentInput.value = '';
  } else {
    const messages = [];
    if (usernameInput.value === '' && commentInput.value === '') {
      messages.push('Please enter a username and a comment.');
    } else if (commentInput.value === '' && usernameInput.value !== '') {
      messages.push('Please enter a username.');
    } else if (usernameInput.value === '' && commentInput.value !== '') {
      messages.push('Please enter a comment.');
    }

    if (messages.length > 0) {
      errorElement.innerText = messages.join(', ');
      setTimeout(() => {
        errorElement.classList.toggle('.hidden');
      }, 3000);
    }
  }
};

export const commentsCounter= (pokemonID, comments) => {
  const sampCommentCount = document.querySelector(
    `#comment-count-${pokemonID}`,
  );
  sampCommentCount.textContent = comments.length> 0 ? comments.length : 0 ;
};

export const addCommentButtonListener = () => {
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
      commentsCounter(cardId, comments);
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

export const sendCommentButtonListener = () => {
  const commentForms = document.querySelectorAll('.comment-form');
  commentForms.forEach((commentForm) => {
    const pokemonID = commentForm.id.split('-')[2];
    const submitButton = document.querySelector(`#add-comment-pk-${pokemonID}`);
    submitButton.addEventListener('click', async (event) => {
      event.preventDefault();
      await sendComment(pokemonID);
      const comments = await getComments(pokemonID);
      commentsCounter(pokemonID, comments);
    });
  });
};
