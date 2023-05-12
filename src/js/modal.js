const openModalBtnEl = document.querySelector('[data-action="open-modal"]');
const closeModalBtnEl = document.querySelector('[data-action="close-modal"]');
const backdropEl = document.querySelector('.js-backdrop');

openModalBtnEl.addEventListener('click', onOpenBtnClick);
closeModalBtnEl.addEventListener('click', onCloseBtnClick);
backdropEl.addEventListener('click', onBackdropClick);

function onOpenBtnClick() {
  window.addEventListener('keydown', onEscPress);
  document.body.classList.add('show-modal');
}

function onCloseBtnClick() {
  window.removeEventListener('keydown', onEscPress);
  document.body.classList.remove('show-modal');
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseBtnClick();
  }
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    onCloseBtnClick();
  }
}
