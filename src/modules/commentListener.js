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