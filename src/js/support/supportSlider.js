import { charityFounds } from './charityFounds';
import { renderingCharityFounds } from './charityFoundsRender';
import Swiper from 'swiper';

const supportListEl = document.querySelector('.support__list-js');
const btnSwiperEl = document.querySelector('.swiper-button-next');

const addLeadingZero = value => String(value).padStart(2, '0');

const markupSetFunds = charityFounds
.map((el, i) => renderingCharityFounds(el, addLeadingZero(i + 1)))
.join('');

supportListEl.innerHTML = markupSetFunds;

const swiper = new Swiper('.swiper', {
direction: 'vertical',
spaceBetween: 20,
slidesPerView: 'auto',
rewind: true,

navigation: {
nextEl: '.swiper-button-next',
},
});

swiper.update();

btnSwiperEl.addEventListener('click', () => swiper.slideNext());