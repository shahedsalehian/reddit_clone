document.addEventListener("DOMContentLoaded", () => {
  let upvote = document.querySelectorAll('.upvote');
  upvote.forEach((item)=>{
    console.log(item.dataset);
  })
});