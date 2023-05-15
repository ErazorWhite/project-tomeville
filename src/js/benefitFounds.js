import Swiper from 'swiper';

const sliderContainer = document.querySelector('.swiper-wrapper');

const swiper = new Swiper(sliderContainer, {
  slidesPerView: 3,
  spaceBetween: 10,
  direction: 'horizontal',
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next', 
  },
  breakpoints: {
    640: {
      slidesPerView: 4,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 40
    }
  }
});
