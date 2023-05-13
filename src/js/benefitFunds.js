var swiper = new Swiper(".swiper-container", {
    direction: "vertical",
    slidesPerView:5,
    height: 30,
    width: 30,
    spaceBetween: 3,
    mousewheel: true,
    grabCursor:true,
    loop: true,
    autoplay: {
      delay: 10,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    //   },
      navigation: {
        nextEl: ".button-js",
        clickable: true
      },
    });
    var button = document.querySelector('.swiper__button');
    button.addEventListener('click', function() {
      swiper.slideNext();
    });

//  переход на следующий слайд
// @importsrc\sass\layout\_benefit_funds.scss

