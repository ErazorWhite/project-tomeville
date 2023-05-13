const htmlBody = document.querySelector('body');
const swiperBtn = document.querySelector('#slider');
// const logoIcon = document.getElementById('header__logo-icon');
// console.log(logoIcon);
// console.dir(logoIcon.href);
const ligthLogo = document.querySelector('.header__logo-icon-light');
const darkLogo = document.querySelector('.header__logo-icon-dark');
invokeStyle();

swiperBtn.addEventListener('change', toggleStyle);

function toggleStyle() {
  if (localStorage.getItem('style') === 'dark-style') {
    saveStyle('light-style');
    swiperBtn.setAttribute('aria-label', 'Світлий стиль сайту');
    darkLogo.classList.remove('logo-active');
    ligthLogo.classList.add('logo-active');
    // logoIcon.setAttribute(
    //   'href',
    //   '/src/images/symbol-defs.svg#white-theme-logo'
    // );
  } else {
    saveStyle('dark-style');
    swiperBtn.setAttribute('aria-label', 'Темний стиль сайту');
    ligthLogo.classList.remove('logo-active');
    darkLogo.classList.add('logo-active');
    // logoIcon.setAttribute(
    //   'href',
    //   '/src/images/symbol-defs.svg#black-them-logo'
    // );
  }
}

function invokeStyle() {
  if (localStorage.getItem('style') === 'dark-style') {
    saveStyle('dark-style');
    swiperBtn.checked = false;
  } else {
    saveStyle('light-style');
    swiperBtn.checked = true;
    swiperBtn.setAttribute('aria-label', 'Світлий стиль сайту');
    ligthLogo.classList.remove('logo-active');
    darkLogo.classList.add('logo-active');

    // logoIcon.setAttribute(
    //   'href',
    //   '/src/images/symbol-defs.svg#white-them-logo'
    // );
  }
}

function saveStyle(styleType) {
  localStorage.setItem('style', styleType);
  htmlBody.className = styleType;
}
