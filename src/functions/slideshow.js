document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;

  function changeImg(n) {
    slideIndex += n;
    showCurrentImg(slideIndex);
  }

  function showCurrentImg(n) {
    let slides = document.getElementsByClassName("my-slides");

    if (n >= slides.length) {
      slideIndex = 0;
    }

    if (n < 0) {
      slideIndex = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
  }
  showCurrentImg(slideIndex);

  document
    .querySelector(".display-left")
    .addEventListener("click", function () {
      changeImg(-1);
    });

  document
    .querySelector(".display-right")
    .addEventListener("click", function () {
      changeImg(1);
    });
});
