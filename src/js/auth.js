const openModalBtn = document.querySelector('.header__btn-signUp');
//   closeModalBtn: document.querySelector('[data-modal-close]'),
const modal = document.querySelector('.backdrop-mob');

openModalBtn.addEventListener('click', toggleModal);
// refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  modal.classList.toggle('is-hidden');
}
