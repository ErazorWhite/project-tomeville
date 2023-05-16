import Swiper from 'swiper';

import { fundArray } from './charityFounds';
import { markupCardFund } from './charityFoundsRender';

const supportListEl = document.querySelector('.support__list-js');
const btnSwiperEl = document.querySelector('.swiper-button-next');

const addLeadingZero = value => String(value).padStart(2, '0');

const markupSetFunds = fundArray
  .map((el, i) => markupCardFund(el, addLeadingZero(i + 1)))
  .join('');

supportListEl.innerHTML = markupSetFunds;

const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  spaceBetween: 20,
  slidesPerView: 'auto',
  rewind: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    loop: true,
  },
});

swiper.update();

btnSwiperEl.addEventListener('click', () => swiper.slideNext());
