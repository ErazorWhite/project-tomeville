import { BookAPI } from './bookAPI';
import storage from './localStorage';

let BOOK_IS_IN_LOCAL_STORAGE;
let KEY_LS;
let VALUE_LS;
const api = new BookAPI();
const { save, load, remove } = storage;

const booksContainerEl = document.querySelector(
  '[data-action="booksContainer"]'
);
const backdropEl = document.querySelector('.js-backdrop');
const markDataContainerEl = document.querySelector(
  '[data-action="popup-data-markup"]'
);
const closePopupBtnEl = document.querySelector('.close-popup');
const addBookBtnEl = document.querySelector('.add-book-button');
const removeBookBtnEl = document.querySelector('.remove-book-button');
const removeBookTextEl = document.querySelector('.remove-book-text');

booksContainerEl.addEventListener('click', onBooksContainerClick);
backdropEl.addEventListener('click', onBackdropClick);
closePopupBtnEl.addEventListener('click', onCloseBtnClick);
addBookBtnEl.addEventListener('click', onAddBookBtnClick);
removeBookBtnEl.addEventListener('click', onRemoveBookBtnClick);

async function onBooksContainerClick(e) {
  e.preventDefault();
  if (e.currentTarget === e.target) {
    return;
  }

  // ------------------------------------
  // Тут робимо запит і передаємо данні на відмальовку у функцію
  const BOOK_ID = e.target.closest('.book-card').dataset.id;
  api.id = BOOK_ID;
  const { book_image, title, author, description, buy_links } =
    await api.getBooksById();
  // console.log({ book_image, title, author, description, buy_links });
  // console.log(buy_links[0]);
  // const urlAmazon = buy_links[0].url;
  // console.log(urlAmazon);
  markDataContainerEl.innerHTML = createBookMarkup(author);
  // -----------------------------------------

  // Звертаємося до локалки і перевіряємо наявність книжки, в залежності від true or undefined показуємо кнопку
  // додати або видалити
  KEY_LS = BOOK_ID;
  VALUE_LS = title;
  BOOK_IS_IN_LOCAL_STORAGE = load(KEY_LS);
  if (BOOK_IS_IN_LOCAL_STORAGE) {
    showAddOrRemoveBtn(true);
  } else {
    showAddOrRemoveBtn(false);
  }

  window.addEventListener('keydown', onEscPress);
  document.body.classList.add('show-popup');
}

function createBookMarkup(author) {
  return `<img src="" alt="">
<title>Book name</title>
<p>Category</p>
<p>Short description</p>
<p>${author}</p>
<a href="">Link Amazon</a>
<a href="">Link More</a>
<a href="">Link else</a>`;
}

// Показуємо кнопку в залежності від значення флажка true or false.
function showAddOrRemoveBtn(bookInLs) {
  if (bookInLs) {
    removeBookBtnEl.removeAttribute('hidden');
    removeBookTextEl.removeAttribute('hidden');
  } else {
    addBookBtnEl.removeAttribute('hidden');
  }
}

function onAddBookBtnClick() {
  // Записуємо данні в локал сторейдж
  // Замінюємо кнопку на ремув
  save(KEY_LS, VALUE_LS);
  addBookBtnEl.setAttribute('hidden', true);
  removeBookBtnEl.removeAttribute('hidden');
  removeBookTextEl.removeAttribute('hidden');
}

function onRemoveBookBtnClick() {
  // Видаляємо дані з локалки
  // Замінюємо кнопку на едд
  remove(KEY_LS);
  removeBookBtnEl.setAttribute('hidden', true);
  removeBookTextEl.setAttribute('hidden', true);
  addBookBtnEl.removeAttribute('hidden');
}

function onCloseBtnClick() {
  window.removeEventListener('keydown', onEscPress);
  document.body.classList.remove('show-popup');

  addBookBtnEl.setAttribute('hidden', true);
  removeBookBtnEl.setAttribute('hidden', true);
  removeBookTextEl.setAttribute('hidden', true);
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
