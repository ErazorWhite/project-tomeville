const htmlBody = document.querySelector('body');
const swiperBtn = document.querySelector('#slider');
const ligthLogo = document.querySelector('.header__logo-icon-light');
const darkLogo = document.querySelector('.header__logo-icon-dark');

invokeStyle();

swiperBtn.addEventListener('change', toggleStyle);

function toggleStyle() {
  if (localStorage.getItem('style') === 'dark-style') {
    saveStyle('light-style');
    swiperBtn.setAttribute('aria-label', 'Світлий стиль сайту');
    darkLogo.classList.remove('is-active');
    ligthLogo.classList.add('is-active');
  } else {
    saveStyle('dark-style');
    swiperBtn.setAttribute('aria-label', 'Темний стиль сайту');
    ligthLogo.classList.remove('is-active');
    darkLogo.classList.add('is-active');
  }
}

function invokeStyle() {
  if (localStorage.getItem('style') === 'dark-style') {
    saveStyle('dark-style');
    swiperBtn.checked = false;
    ligthLogo.classList.remove('is-active');
    darkLogo.classList.add('is-active');
  } else {
    saveStyle('light-style');
    swiperBtn.checked = true;
    swiperBtn.setAttribute('aria-label', 'Світлий стиль сайту');
    darkLogo.classList.remove('is-active');
    ligthLogo.classList.add('is-active');
  }
}

function saveStyle(styleType) {
  localStorage.setItem('style', styleType);
  htmlBody.className = styleType;
}
