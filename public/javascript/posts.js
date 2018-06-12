document.addEventListener("DOMContentLoaded", () => {
  let upvote = document.querySelectorAll('.upvote');
  upvote.forEach((item) => {
    item.firstElementChild.onclick = () => {
      alert(item.dataset.postId);
    }
  });

  let downvote = document.querySelectorAll('.downvote');
  downvote.forEach((item) => {
    item.firstElementChild.onclick = () => {
      alert(item.dataset.postId);
    }
  });
});