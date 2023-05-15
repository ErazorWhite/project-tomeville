import { BookAPI } from './bookAPI';
import storage from './localStorage';

let BOOK_ID;
const KEY_LS = 'booksInShopingList';
let BOOKS_IDS = {
  id: [],
};
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
  BOOK_ID = e.target.closest('.book-card').dataset.id;
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
  BOOKS_IDS = load(KEY_LS) || {
    id: [],
  };
  if (BOOKS_IDS.id.includes(BOOK_ID)) {
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
  BOOKS_IDS.id.push(BOOK_ID);
  save(KEY_LS, BOOKS_IDS);

  addBookBtnEl.setAttribute('hidden', true);
  removeBookBtnEl.removeAttribute('hidden');
  removeBookTextEl.removeAttribute('hidden');
}

function onRemoveBookBtnClick() {
  // Видаляємо дані з локалки
  // Замінюємо кнопку на едд
  const newArrr = BOOKS_IDS.id.filter(item => item !== BOOK_ID);
  BOOKS_IDS.id = newArrr;
  save(KEY_LS, BOOKS_IDS);
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

export { BOOKS_IDS };
