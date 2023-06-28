const addCommentButtonListener = () => {
  const commentBtns = document.querySelectorAll(".comment-btn");
  const pokemonCards = document.querySelectorAll(".pokemon-card");
  const ClosepopupBtns = document.querySelectorAll(".close-popup");
  const popup = document.querySelector(".popup");

  commentBtns.forEach((commentBtn) => {
    commentBtn.addEventListener("click", (event) => {
      popup.classList.toggle("hidden");
      pokemonCards.forEach((card) => {
        card.classList.add("hidden");
      });
    });
  });
  ClosepopupBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", (event) => {
      popup.classList.toggle("hidden");
      pokemonCards.forEach((card) => {
        card.classList.remove("hidden");
      });
    });
  });
};

export default addCommentButtonListener;