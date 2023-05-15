import Swiper from 'swiper';

import 'swiper/swiper-bundle.css';

var swiper = new Swiper('.mySwiper', {
  slidesPerView: 3,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
