import { BookAPI } from './bookAPI';
import storage from './localStorage';

const api = new BookAPI();
let BOOK_IS_IN_LOCAL_STORAGE = false;
let KEY_LS;
let VALUE_LS;
const { save, load, remove } = storage;

// тестовий контейнер потім тут має бути контенер з книгами, точніше на нього задати даний дата атребут
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
  const BOOK_ID = e.target.closest('.book-card').dataset.bookId;
  // console.log(BOOK_ID);
  // замість цього: '643282b1e85766588626a080'; буде BOOK_ID
  api.id = '643282b1e85766588626a080';
  const { book_image, title, author, description, buy_links } =
    await api.getBooksById();
  // console.log({ book_image, title, author, description, buy_links });
  // console.log(buy_links[0]);
  const urlAmazon = buy_links[0].url;
  // console.log(urlAmazon);
  markDataContainerEl.innerHTML = createBookMarkup(author);
  // -----------------------------------------

  VALUE_LS = title;
  KEY_LS = 'dsa20344';
  // save(key, '643282b1e85766588626a080');

  // Звертаємося до локалки і перевіряємо наявність книжки, в залежності від true or undefined показуємо кнопку
  // додати або видалити
  BOOK_IS_IN_LOCAL_STORAGE = load(KEY_LS);
  if (BOOK_IS_IN_LOCAL_STORAGE) {
    console.log(BOOK_IS_IN_LOCAL_STORAGE);
    showAddOrRemoveBtn(true);
  } else {
    showAddOrRemoveBtn(false);
  }

  // ----------------------------------------
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
  console.log(bookInLs);
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
