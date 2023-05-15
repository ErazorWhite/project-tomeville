import * as bodyScrollLock from 'body-scroll-lock';

const mobileMenu = document.querySelector('.js-menu-container');
const openMenuBtn = document.querySelector('.js-open-menu');
const burderMenuIcon = document.querySelector('.header__burger-menu');
const burgerCloseIcon = document.querySelector('.header__burger-close');

openMenuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  const isMenuOpen =
    openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
  mobileMenu.classList.toggle('is-open');
  burderMenuIcon.classList.toggle('is-active');
  burgerCloseIcon.classList.toggle('is-active');

  const scrollLockMethod = !isMenuOpen
    ? 'disableBodyScroll'
    : 'enableBodyScroll';
  bodyScrollLock[scrollLockMethod](document.body);
}

// Close the mobile menu on wider screens if the device orientation changes
window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
  if (!e.matches) return;
  mobileMenu.classList.remove('is-open');
  openMenuBtn.setAttribute('aria-expanded', false);
  burgerCloseIcon.classList.remove('is-active');
  burderMenuIcon.classList.add('is-active');
  bodyScrollLock.enableBodyScroll(document.body);
});
